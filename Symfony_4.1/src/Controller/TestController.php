<?php

namespace App\Controller;

use AppBundle\Entity\Type;
use AppBundle\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class TestController extends AbstractController
{
    /**
     * @Route("/test", name="create")
     */
    public function create(EntityManagerInterface $em)
    {
        $genre1 = new Type;
        $genre1->setName('test');
        // $genre2 = new Event;
        // $genre2->setName('Festival de la mouche');
        // $genre2->setCoordonates('ici');
        // $genre2->setDescription('The Festival of the mouche');
        // $genre2->setBegin(new \DateTime());
        // $genre2->setEnd(new \DateTime());
// dump($genre1);

        $em->persist($genre1);
        // $em->persist($genre2);

        $em->flush();
        // $repos = $this->getDoctrine()->getRepository(Type::class)->findAll();
        // dump($repos);
        die();

        return $this->redirectToRoute('homepage');
    }

}
