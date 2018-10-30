<?php

namespace App\Controller;

use App\Entity\Person;
use App\Entity\City;
use App\Entity\Role;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * User controller.
 *
 * @Route("user")
 */
class UserController extends AbstractController
{

    /**
     * Lists all person entities.
     *
     * @Route("/", name="person_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $persons = $em->getRepository('App:Person')->findAll();
        foreach ($persons as $person) {
            $data[] = array('id' => $person->getId(),
                'name' => $person->getUsername()
            );
        }
        return $this->json($data);
    }

    /**
     * Creates a new person entity.
     *
     * @Route("/signup", name="user_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request, \Swift_Mailer $mailer, UserPasswordEncoderInterface $encoder)
    {

        $user = new Person;

//        $encodedPassword = $encoder->encodePassword($user, ($request->request->get('password')));
//        $citySlug = strtolower($request->request->get('city'));

        $user->setUsername($request->request->get('username'));
        $user->setEmail($request->request->get('email'));
        $user->setDescription($request->request->get('description'));
        $user->setPassword($encoder->encodePassword($user, ($request->request->get('password'))));
        $user->setIsActive('1');
        $user->setRoleId($this->getDoctrine()->getManager()->getRepository(Role::class)->findOneById('1'));
        $user->setCity($this->getDoctrine()->getManager()->getRepository(city::class)->findOneBySlug(strtolower($request->request->get('city'))));
//        dump($role);die;

//        $data = $request->getContent();
//        $decoded = json_decode($data, true);
//
//        $user->setUsername($decoded['username']);
//        $user->setEmail($decoded['email']);
//        $user->setDescription($decoded['description']);
//        $user->setCity(
//            $this->getDoctrine()
//                ->getRepository(City::class)
//                ->findOneBySlug($citySlug)
//        );

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

//        // Envoi d'un mail automatique avec swiftMailer
//        $message = (new \Swift_Message('Hello Email'))
//            ->setFrom('freeworld.project.2018@gmail.com')
//            ->setTo($decoded['email'])
//            ->setBody(
//                $this->renderView(
//                // app/Resources/views/Emails/registration.html.twig
//                    'Emails/registration.html.twig',
//                    array('username' => $decoded['username'])
//                ),
//                'text/html'
//            )
//        ;
//
//        $mailer->send($message);


        return $this->json(
            ['Nouvel Utilisateur' => $request->request->get('username'), 'Email' => 'Email sent']
        );

    }





//    /**
//     * Lists all person entities by role.
//     *
//     * @Route("/role/{id}/list", name="role_list")
//     * @Method("GET")
//     */
//    public function ListAction($id){
//        $em = $this->getDoctrine()->getManager();
//        $users = $em->getRepository('App:Person')->findAll($id);
////        dump($users);
//        foreach ($users as $user) {
//            $data[] = array('id' => $user->getId(),
//                'name' => $user->getUsername(),
//                'email' => $user->getEmail(),
//            );
//        }
//        return $this->json($data);
//
//    }


    /**
     * Finds and displays a person entity.
     *
     * @Route("/{id}/show", name="person_show")
     * @Method("POST")
     */
    public function showAction(Request $request, $id)
    {

        $user = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Person')
            ->findOneById($id);
//        dump($user);die;

        return $this->json(
            array('Name' => $user->getUsername(),
                'Email' => $user->getEmail(),
                'Description' => $user->getDescription(),
                'City' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:City')
                    ->findOneById($user->getCity())
                    ->getRealName(),
                'Image' =>$user->getImage()

            ),
            Response::HTTP_OK
        );
    }

    /**
     * Sends image URL in user entity.
     *
     * @Route("/upload", name="user_upload")
     * @Method("POST")
     */
    public function uploadAction(Request $request){

        $user = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Person')
            ->findOneById(
                json_decode($request->getContent(), true)['id']);

        $user->setImage(json_decode($request->getContent(), true)['image']);

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['Image stockée' => 'Ok']
        );
    }


}