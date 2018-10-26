<?php

namespace App\Controller;

use App\Entity\City;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * City controller.
 *
 * @Route("city")
 */
class CityController extends AbstractController
{
    /**
     * Lists all city entities.
     *
     * @Route("/", name="city_index")
     * @Method({"GET", "POST"})
     */
    public function indexAction()
    {
        $cities = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:City')->findAll();

        foreach ($cities as $city) {
            $data[] = array(
                'id' => $city->getId(),
                'realName' => $city->getRealName()
            );
        }
        // dump($data);die;
        return $this->json($data);
    }


    /**
     * Finds and displays a city entity.
     *
     * @Route("/{id}", name="city_show")
     * @Method("GET")
     */
    public function showAction(City $city)
    {
        return $this->json(
            array(
                'id' => $city->getId(),
                'realName' => $city->getRealName()
            ),
            Response::HTTP_OK
        );
    }

    /**
     * Finds and displays a city entity.
     *
     * @Route("/search/{slug}", name="city_search")
     */
    public function searchAction($slug)
    {
        // On normalise le placeholder
        $slug = strtolower($slug);
        $pattern = "#\W|_#";

        $slugs = preg_split ( $pattern , $slug);

        $slug = implode("-", $slugs);

        // On récupère les datas correspondant au placeholder
        $city = $this->getDoctrine()
            ->getRepository(City::class)
            ->findOneBySlug($slug);

        // Si aucune data n'est récupérée
        if (!$city) {
            throw $this->createNotFoundException(
                Response::HTTP_NOT_FOUND
            );
        }

        // On renvoie une réponse json

        return $this->json(
            array(
                'realName' => $city->getRealName(),
                'longitudeDeg' => $city->getLongitudeDeg(),
                'latitudeDeg' => $city->getLatitudeDeg(),
            ),
            Response::HTTP_OK
        );
    }
}
