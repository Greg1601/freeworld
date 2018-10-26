<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function indexAction(Request $request)

    {
        $data = $request->getContent();

        return $this->json(
            ['test' => $data],
            Response::HTTP_OK
        );

    }

}
