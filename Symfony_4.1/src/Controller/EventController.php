<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\Place;
use App\Entity\Person;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * City controller.
 *
 * @Route("event")
 */
class EventController extends AbstractController
{

    /**
     * Lists all event entities .
     *
     * @Route("/list", name="event_index")
     */
    public function indexAction()
    {
        $events = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Event')->findAll();

        foreach ($events as $event) {
            $data[] = array(
                'Name' => $event->getName(),
                'Coordonates' => $event->getCoordonates(),
                'Description' => $event->getDescription(),
                'Begin' => $event->getBegin(),
                'End' => $event->getEnd(),
                'Image' => $event->getImage(),
                'Place' => $event->getPlaceId()->getName(),
            );
        }
        // dump($data);die;
        return $this->json($data);
    }

    /**
     * Adds an event entity.
     *
     * @Route("/new", name="event_add")
     */
    public function addEvent(Request $request)
    {
//        $data = $request->request->getContent();
//        $decoded = json_decode($data, true);

//        $place = $request->request->get('eventplace');
//        dump($place);die;
        $placeSlug = strtolower($request->request->get('eventplace'));

        $event = new Event();
        $event->setName($request->request->get('eventname'));

        $event->setPlaceId(
            $this->getDoctrine()
                ->getRepository(Place::class)
                ->findOneByName($placeSlug)
        );

        $event->setCoordonates($request->request->get('eventaddress'));
        $event->setDescription($request->request->get('eventdescription'));
        $event->setBegin($request->request->get('eventbegin'));
        $event->setEnd($request->request->get('eventend'));
        $event->setImage($request->request->get('eventimage'));
        $event->setUserId(
            $this->getDoctrine()
                ->getRepository(Person::class)
                ->findOneById($request->request->get('userId'))
        );

        $this->getDoctrine()->getManager()->persist($event);
        $this->getDoctrine()->getManager()->flush();

        return $this->json(
            ['New Place' => $event->getName()],
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
     * Finds and displays an event entity.
     *
     * @Route("/show", name="event_show")
     */
    public function showAction(Request $request)
    {

        $event = $this->getDoctrine()
            ->getManager()
            ->getRepository('App:Event')
            ->findOneById(
                json_decode($request->request->get('id')
                )
            )
        ;



        return $this->json(
            array('Name' => $event->getName(),
                'Coordonates' => $event->getCoordonates(),
                'Description' => $event->getDescription(),
                'Place' => $this
                    ->getDoctrine()
                    ->getManager()
                    ->getRepository('App:Place')
                    ->findOneById($event->getPlaceId())
                    ->getName(),
                'Image' => $event->getImage(),
                'Begin' => $event->getBegin(),
                'End' => $event->getEnd(),
            ),
            Response::HTTP_OK
        );
    }
}
