<?php

namespace App\Controller;

use App\Entity\Place;
use App\Entity\Post;
use App\Entity\Person;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

/**
 * Post controller.
 *
 * @Route("post")
 */
class PostController extends AbstractController
{
    /**
     * Lists all post entities by place Id.
     *
     * @Route("/{id}/list", name="post_index")
     * @Method({"POST"})
     */
    public function listPostsByPlaceId(Request $request, $id)
    {
        $posts = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Post')->findByPlaceId($id);


        foreach ($posts as $post) {
            $data[] = array(
                'Title' => $post->getTitle(),
                'Body' => $post->getBody(),
                'Release' => $post->getReleasedDate(),
                'Username' => $post->getAuthor()->getUsername(),
                'Positive' => $post->getPositiveOpinion(),
                'Negative' => $post->getNegativeOpinion(),
            );
        }
        return $this->json($data);
    }

    /**
     * Adds a post entity.
     *
     * @Route("/new", name="post_add")
     * @Method({"GET", "POST"})
     */
    public function addPost(Request $request)
    {
//        $placeId = json_decode($request->getContent(), true)['postplaceid'];
        $user = json_decode($request->request->get('userId'));

        $targetPlace = $this->getDoctrine()
            ->getRepository(Place::class)
            ->findOneById($request->request->get('placeId'));

        $post = new Post();
        $post->setTitle($request->request->get('titleComment'));
        $post->setPlace($targetPlace);

        $post->setUser(
            $this->getDoctrine()
                ->getRepository(Person::class)
                ->findOneById($user)
        );
        $post->setBody($request->request->get('comment'));

        // récupération de la valeur 'vote' de l'entité Place visée (0 pour un vote negatif, 1 pour un vote positif)
        $vote = $request->request->get('vote');
        // Si la valeur de 'vote' est '0', on incrémente 'negative opinion'
        if ($vote >= 0){
            $newPositiveOpinion = $targetPlace->getPositiveOpinion() +1;
            $targetPlace->setPositiveOpinion($newPositiveOpinion);
        }
        else {
            $newNegativeOpinion = $targetPlace->getNegativeOpinion() +1;
            $targetPlace->setNegativeOpinion($newNegativeOpinion);
        }

        $this->getDoctrine()->getManager()->persist($post);
        // renvoi de la valeur dans l'entité Place
        $this->getDoctrine()->getManager()->persist($targetPlace);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New Post' => $post->getTitle()],
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
     * Finds and displays a post entity by id.
     *
     * @Route("/{id}/show", name="post_show")
     * @Method("POST")
     */
    public function showAction(Request $request, $id)
    {

        $post = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Post')
            ->findOneById($id)
        ;


        return $this->json(
            array('Title' => $post->getTitle(),
                'Body' => $post->getBody(),
                'Image' => $post->getImage(),
                'Place' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Place')
                    ->findOneById($post->getPlace())
                    ->getName(),
                'Author' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Person')
                    ->findOneById($post->getAuthor())
                    ->getUsername(),
                'Release' => $post->getReleasedDate(),
                'Positive' => $post->getPositiveOpinion(),
                'Negative' => $post->getNegativeOpinion(),
            ),
            Response::HTTP_OK
        );
    }
}
