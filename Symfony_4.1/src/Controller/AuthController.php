<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Person;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthController extends AbstractController
{
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {

        $data = $request->getContent();
        $decoded = json_decode($data, true);

        $user = new Person();
        $user->setUsername($decoded['username']);
        $user->setEmail($decoded['email']);
        $user->setPassword($encoder->encodePassword($user, $request->request->get('password')));
        $user->setIsActive('1');

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New User' => $user->getUsername()],
            Response::HTTP_OK
        );
//        return new Response(sprintf('User %s successfully created', $user->getUsername()));
    }

    public function api()
    {
        return $this->json(
            ['Logged' => $this->getUser()->getUsername()],
            Response::HTTP_OK
        );
    }

}
