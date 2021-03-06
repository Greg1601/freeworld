<?php

namespace App\Controller;

use App\Entity\Accessibility;
use App\Entity\City;
use App\Entity\Person;
use App\Entity\Place;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Place controller.
 *
 * @Route("place")
 */
class PlaceController extends AbstractController

{

    /**
     * Lists all place entities.
     *
     * @Route("/list", name="place_index")
     * @Method({"GET", "POST"})
     */
    public function indexAction()
    {


        // Récupération de la liste
        $places = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Place')->findAll();

        // Boucle sur la totalité de la liste et définition des données à renvoyer

        if ($places) {
            foreach ($places as $place) {

                // test sur les accessibilités, si un ou plusieurs équipement d'accès sont enregistrés dans la bdd on renvoie true, sinon false.
                if ($place->getAccessibilities())
                {
                    $access = true;
                }
                else {
                    $access = false;
                };

                // on prépare les données à renvoyer
                $data[] = array(
                    'Id' => $place->getId(),
                    'Name' => $place->getName(),
                    'Address' => $place->getAddress(),
                    'Description' => $place->getDescription(),
                    'Image' => $place->getImage(),
                    'Positive' => $place->getPositiveOpinion(),
                    'Negative' => $place->getNegativeOpinion(),
                    'Longitude' => $place->getLongitudeDeg(),
                    'Latitude' => $place->getLatitudeDeg(),
                    'Access' => $access,
                    'Placetype' => $place->getType(),
                );
            }
        }
        // Renvoi des données
        return $this->json($data);
    }

    /**
     * Adds a place entity.
     *
     * @Route("/new", name="place_add")
     * @Method({"GET", "POST"})
     */
    public function addPlace(Request $request)
    {

        // Récupération des données envoyées par le front
        $data = $request->getContent();
        // Décodage des données
        $decoded = json_decode($data, true);

        // Récupération de l'info City puis "slugification"
        $city = $decoded['placecity'];
        $citySlug = strtolower($city);
//        dump($citySlug);die;

        // Récupération de l'ID utilisateur
        $userId = $decoded['userId'];

        // Création de la nouvelle entité et ajout des données récupérées puis décodées
        $place = new Place();
        $place->setName($decoded['placename']);

        $place->setCityId(
            $this->getDoctrine()
                ->getRepository(City::class)
                ->findOneBySlug($citySlug)
        );
        $place->setUserId(
            $this->getDoctrine()
                ->getRepository(Person::class)
                ->findOneById($userId)
        );

        $place->setAddress($decoded['placeaddress']);
        $place->setDescription($decoded['placedescription']);
        $place->setLatitudeDeg($decoded['lat']);
        $place->setLongitudeDeg($decoded['lng']);
        $place->setType($decoded['placetype']);

        // gestion des ajouts d'équipment dans la table place_accessibility
        // Le front ne récupère pas la liste en dynamique, pour le moment les éléments sont gérés en dur
        // Si le front renvoie "true", alors on l'ajout à Accessibility
        if ($decoded['rampe']){
            $place->addAccessibility(
                $this->getDoctrine()->getManager()->getRepository(Accessibility::class)->findOneByEquipment('rampe')
            );
        }
        if ($decoded['ascenseur']){
            $place->addAccessibility(
                $this->getDoctrine()->getManager()->getRepository(Accessibility::class)->findOneByEquipment('ascenseur')
            );
        }
        if ($decoded['place']){
            $place->addAccessibility(
                $this->getDoctrine()->getManager()->getRepository(Accessibility::class)->findOneByEquipment('place')
            );
        }
        if ($decoded['wc']){
            $place->addAccessibility(
                $this->getDoctrine()->getManager()->getRepository(Accessibility::class)->findOneByEquipment('wc')
            );
        }
        if ($decoded['entree']){
            $place->addAccessibility(
                $this->getDoctrine()->getManager()->getRepository(Accessibility::class)->findOneByEquipment('entree')
            );
        }


        $this->getDoctrine()->getManager()->persist($place);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New Place' => $place->getName()],
            Response::HTTP_OK
        );

    }

    /**
     * Finds and displays a place entity.
     *
     * @Route("/show", name="place_show")
     * @Method("Post")
     */
     public function showAction(Request $request)
    {

        // Récupération de l'info 'id" du lieu qu'on veut afficher
        $place = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Place')
            ->findOneById(
                // !!!!!!!!!!!!!!!! Ligne pour test avec Postman !!!!!!!!!!!!!
//                $request->request->get('id')
                json_decode($request->getContent(), true)['id']
            )
        ;

        $postList = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Post')
            ->findByPlace($place);

        // Récupération du nom du ou des objets de classe Accessibility relatif(s) à l'objet $place dans un tableau pour affichage
        foreach ($place->getAccessibilities() as $accesses){
            $access[] = $accesses->getEquipment();
        }

        if ($postList != null) {
            // Récupération des éléments "Post" relatifs à chaque élément "Place"
            foreach ($postList as $post) {

                // récupération de la liste des commentaires en relation avec un post donné, via son ID
                $commentsList = $this->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Comment')
                    ->findByPostId($post->getId());

                if ($commentsList != null) {

                    // Récupération des éléments "Comment" relatifs à chaque élément "Post"
                    foreach ($commentsList as $comment) {

                        // Récupération de l'auteur du comment
                        $author = $this->getDoctrine()
                            ->getManager()
                            ->getRepository('App:Person')
                            ->findOneById($comment->getUserId())
                            ->getUsername();

                        // Préparation des éléments Comment pour renvoi
                        $commentDetails = array(
                            'Id' => $comment->getId(),
                            'Body' => $comment->getBody(),
                            'Released' => $comment->getReleasedDate(),
                            'Author' => $author
                        );
                    }

                }
                // Si il n'y a pas de Comment relatif au Post, on renvoie null
                else {
                    $commentDetails = null;
                }

                // Préparation des éléments Post pour renvoi
                $posts[] = array(
                    'Id' => $post->getId(),
                    'Title' => $post->getTitle(),
                    'Body' => $post->getBody(),
                    'Image' => $post->getImage(),
                    'Released' => $post->getReleasedDate(),
                    'PositiveOpinion' => $post->getPositiveOpinion(),
                    'NegativeOpinion' => $post->getNegativeOpinion(),
                    'Place' => $post->getPlace()->getName(),
                    'Author' => $post->getAuthor()->getUsername(),
                    'Comments' => $commentDetails
                );

            }
        }
        // si il n'y a pas de Post relatif au Place, on renvoie null
        else {
            $posts = null;
        }
        // renvoi des données récupérées en BDD
        return $this->json(
            array(
                'Id' => $place->getId(),
                'Name' => $place->getName(),
                'Address' => $place->getAddress(),
                'Description' => $place->getDescription(),
                'City' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:City')
                    ->findOneById($place->getCityId())
                    ->getRealName(),
                'Image' => $place->getImage(),
                'Access' => $access,
                'Posts' => $posts,
                'Positive' => $place->getPositiveOpinion(),
                'Negative' => $place->getNegativeOpinion(),
                'Latitude' => $place->getLatitudeDeg(),
                'Longitude' => $place->getLongitudeDeg(),
                'Placetype' => $place->getType(),
            ),
            Response::HTTP_OK
        );
    }



    /**
     * Sends image URL in user entity.
     *
     * @Route("/upload", name="place_upload")
     * @Method("POST")
     */
    public function uploadAction(Request $request){

        $place = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Place')
            ->findOneById(
                json_decode($request->getContent(), true)['id']);

        $place->setImage(json_decode($request->getContent(), true)['image']);

        $this->getDoctrine()->getManager()->persist($place);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['Image stockée' => 'Ok']
        );
    }


}
