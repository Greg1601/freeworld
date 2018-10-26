<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Place;
use App\Entity\Post;
use App\Entity\Person;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

/**
 * Comment controller.
 *
 * @Route("comment")
 */
class CommentController extends AbstractController
{
    /**
     * Lists all comment entities by post Id.
     *
     * @Route("/list", name="comment_index")
     * @Method({"POST"})
     */
    public function listCommentsByPostId(Request $request)
    {
        $comments = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Comment')->findByPost(json_decode($request->getContent(), true)['id']);

        foreach ($comments as $comment) {
            $data[] = array(
                'Body' => $comment->getBody(),
                'Author' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Person')
                    ->findOneById($comment->getUser())
                    ->getUsername(),
                'Release' => $comment->getReleasedDate(),
            );
        }
        return $this->json($data);
    }

    /**
     * Lists all comment entities by author Id.
     *
     * @Route("/author/list", name="comment_index_by_author")
     * @Method({"POST"})
     */
    public function listCommentsByAuthorId(Request $request)
    {
        $comments = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Comment')->findByUser(json_decode($request->getContent(), true)['id']);

        foreach ($comments as $comment) {
            $data[] = array(
                'Body' => $comment->getBody(),
                'Post' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Post')
                    ->findOneById($comment->getPost())
                    ->getTitle(),
                'Release' => $comment->getReleasedDate(),
            );
        }
        return $this->json($data);
    }

    /**
     * Adds a comment entity.
     *
     * @Route("/new", name="comment_add")
     * @Method("POST")
     */
    public function addComment(Request $request)
    {
        $postId = json_decode($request->getContent(), true)['commentpostid'];
        $user = json_decode($request->getContent(), true)['userid'];

        $comment = new Comment();
        $comment->setPost(
            $this->getDoctrine()
                ->getRepository(Post::class)
                ->findOneById($postId)
        );
        $comment->setUser(
            $this->getDoctrine()
                ->getRepository(User::class)
                ->findOneById($user)
        );
        $comment->setBody(json_decode($request->getContent(), true)['commentbody']);

        $this->getDoctrine()->getManager()->persist($comment);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New Comment' => 'Commentaire ajouté'],
            Response::HTTP_OK
        );
    }

    /**
     * Finds and displays a comment entity by id.
     *
     * @Route("/show", name="comment_show")
     * @Method("Post")
     */
    public function showAction(Request $request)
    {

        $comment = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Comment')
            ->findOneById(
                json_decode($request->getContent(), true)['id']
            )
        ;


        return $this->json(
            array('Body' => $comment->getBody(),
                'Post' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Post')
                    ->findOneById($comment->getPost())
                    ->getTitle(),
                'Author' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:User')
                    ->findOneById($comment->getUser())
                    ->getUsername(),
                'Release' => $comment->getReleasedDate(),
            ),
            Response::HTTP_OK
        );
    }
}
