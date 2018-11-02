<?php

namespace App\Controller;

use App\Entity\Messages;
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
                    '/mails/questionEmail.html.twig',
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

        $userMessage = (new \Swift_Message('Question!!'))
            ->setFrom('freeworld.project.2018@gmail.com')
            ->setTo(json_decode($request->getContent(), true)['email'])
            ->setBody(
                $this->renderView(
                    '/mails/userQuestionEmail.html.twig',
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
        $mailer->send($userMessage);

        // Ajout du message à la base de données

//        // Récupération des données envoyées par le front
//        $data = $request->getContent();
//        // Décodage des données
//        $decoded = json_decode($data, true);

        // Création de la nouvelle entité et ajout des données récupérées puis décodées
        $newMessage = new Messages();
        $newMessage->setTitle(json_decode($request->getContent(), true)['title']);
        $newMessage->setMessage(json_decode($request->getContent(), true)['message']);
        $newMessage->setFirstname(json_decode($request->getContent(), true)['firstname']);
        $newMessage->setLastname(json_decode($request->getContent(), true)['lastname']);
        $newMessage->setEmail(json_decode($request->getContent(), true)['email']);
        $newMessage->setPhone(json_decode($request->getContent(), true)['phone']);

        $this->getDoctrine()->getManager()->persist($newMessage);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['Question envoyée' => json_decode($request
                ->getContent(), true)['title']]
        );

    }
}