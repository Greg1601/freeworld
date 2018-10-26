<?php

namespace App\Controller;

use App\Entity\City;
use App\Entity\Person;
use App\Entity\Place;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

class AdminPlaceController extends AbstractController

{

    /**
     * Lists all place entities.
     *
     * @Route("/list", name="place_index")
     * @Method({"GET", "POST"})
     */
    public function indexAction()
    {
        $places = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Place')->findAll();

        foreach ($places as $place) {
            $data[] = array(
                'Name' => $place->getName(),
                'Address' => $place->getAddress(),
                'Description' => $place->getDescription(),
                'Image' => $place->getImage(),
                'Positive' => $place->getPositiveOpinion(),
                'Negative' => $place->getNegativeOpinion(),
                'Longitude' => $place->getLongitudeDeg(),
                'Latitude' => $place->getLatitudeDeg(),
            );
        }
        // dump($data);die;
        return $this->json($data);
    }

    /**
     * Adds a place entity.
     *
     * @Route("/new", name="place_add")
     * @Method("POST")
     */
    public function addPlace(Request $request)
    {
        $data = $request->getContent();
        $decoded = json_decode($data, true);
        dump($decoded);die;
        $city = $decoded['placecity'];
        $citySlug = strtolower($city);

        $userId = $decoded['userId'];

        $place = new Place();
        $place->setName($decoded['placename']);

        $place->setCity(
            $this->getDoctrine()
                ->getRepository(City::class)
                ->findOneBySlug($citySlug)
        );
        $place->setUser(
            $this->getDoctrine()
                ->getRepository(Person::class)
                ->findOneById($userId)
        );

        $place->setAddress($decoded['placeaddress']);
        $place->setDescription($decoded['placedescription']);
        $place->setLatitudeDeg($decoded['lat']);
        $place->setLongitudeDeg($decoded['lng']);

        $this->getDoctrine()->getManager()->persist($place);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New Place' => $place->getName()],
            Response::HTTP_OK
        );

//        $data = $request->getContent();
//
//        return $this->json(
//            ['test' => $data],
//            Response::HTTP_OK
//        );
    }

    /**
     * Finds and displays a place entity by ID.
     *
     * @Route("/show", name="place_show")
     * @Method("Post")
     */
    public function showAction(Request $request)
    {

        $place = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Place')
            ->findOneById(
                json_decode($request->getContent(), true)['id']
            )
        ;


        return $this->json(
            array('Name' => $place->getName(),
                'Address' => $place->getAddress(),
                'Description' => $place->getDescription(),
                'City' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:City')
                    ->findOneById($place->getCity())
                    ->getRealName(),
                'Image' => $place->getImage(),
                'Positive' => $place->getPositiveOpinion(),
                'Negative' => $place->getNegativeOpinion(),
                'Latitude' => $place->getLatitudeDeg(),
                'Longitude' => $place->getLongitudeDeg(),
            ),
            Response::HTTP_OK
        );
    }

//    /**
//     * deletes a place entity by ID.
//     *
//     * @Route("admin/place/delete", name="place_delete")
//     * @Method("POST")
//     */
//    public function PlaceDeleteAction(Request $request)
//    {
//        $place = $this->getDoctrine()
//            ->getManager()
//            ->getRepository('App:Place')
//            ->findOneById(
//                json_decode($request->getContent(), true)['id']
//            )
//        ;
//
//        $this->getDoctrine()->getManager()->remove($place);
//        $this->getDoctrine()->getManager()->flush();
//
//        return $this->json(
//            ['Message' => 'Le lieux a été supprimé.'],
//            Response::HTTP_OK
//        );
//    }



}
