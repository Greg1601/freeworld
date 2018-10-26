<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Question controller.
 *
 * @Route("question")
 */
class QuestionController extends AbstractController
{
    /**
     * Creates a new person entity.
     *
     * @Route("/new", name="question_send")
     * @Method({"POST"})
     */
    public function newQuestion(Request $request, \Swift_Mailer $mailer)
    {
        // Envoi d'un mail avec swiftMailer
        $message = (new \Swift_Message('Question!!'))
            ->setFrom('freeworld.project.2018@gmail.com')
            ->setTo('freeworld.project.2018@gmail.com')
            ->setBody(
                $this->renderView(
                    'Emails/question.html.twig',
                    array(
                        'title' => json_decode($request
                            ->getContent(), true)['title'],
                        'lastname' => json_decode($request
                            ->getContent(), true)['lastname'],
                        'firstname' => json_decode($request
                            ->getContent(), true)['firstname'],
                        'email' => json_decode($request
                            ->getContent(), true)['email'],
                        'phone' => json_decode($request
                            ->getContent(), true)['phone'],
                        'message' => json_decode($request
                            ->getContent(), true)['message'])
                ),
                'text/html'
            )
        ;

        $mailer->send($message);

        return $this->json(
            ['Question envoyée' => json_decode($request
                ->getContent(), true)['title']]
        );

//        $data = $request->getContent();
//
//        return $this->json(
//            ['test' => $data],
//            Response::HTTP_OK
//        );
    }
}