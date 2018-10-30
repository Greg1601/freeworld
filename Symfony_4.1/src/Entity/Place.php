<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PlaceRepository")
 */
class Place
{

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="integer")
     */
    private $positiveOpinion;

    /**
     * @ORM\Column(type="integer")
     */
    private $negativeOpinion;

    /**
     * @ORM\Column(type="float")
     */
    private $longitude_deg;

    /**
     * @ORM\Column(type="float")
     */
    private $latitude_deg;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="place_id")
     */
    private $events;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\City", inversedBy="places")
     */
    private $city_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person", inversedBy="places")
     */
    private $user_id;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\PlaceType", inversedBy="places")
     */
    private $placetypes;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Accessibility", inversedBy="places")
     */
    private $accessibilities;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Post", mappedBy="place")
     */
    private $Posts;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->placetypes = new ArrayCollection();
        $this->accessibilities = new ArrayCollection();
        $this->Posts = new ArrayCollection();
        $this->positiveOpinion = '0';
        $this->negativeOpinion = '0';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getPositiveOpinion(): ?int
    {
        return $this->positiveOpinion;
    }

    public function setPositiveOpinion(int $positiveOpinion): self
    {
        $this->positiveOpinion = $positiveOpinion;

        return $this;
    }

    public function getNegativeOpinion(): ?int
    {
        return $this->negativeOpinion;
    }

    public function setNegativeOpinion(int $negativeOpinion): self
    {
        $this->negativeOpinion = $negativeOpinion;

        return $this;
    }

    public function getLongitudeDeg(): ?float
    {
        return $this->longitude_deg;
    }

    public function setLongitudeDeg(float $longitude_deg): self
    {
        $this->longitude_deg = $longitude_deg;

        return $this;
    }

    public function getLatitudeDeg(): ?float
    {
        return $this->latitude_deg;
    }

    public function setLatitudeDeg(float $latitude_deg): self
    {
        $this->latitude_deg = $latitude_deg;

        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(?int $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setPlaceId($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
            // set the owning side to null (unless already changed)
            if ($event->getPlaceId() === $this) {
                $event->setPlaceId(null);
            }
        }

        return $this;
    }

    public function getCityId(): ?City
    {
        return $this->city_id;
    }

    public function setCityId(?City $city_id): self
    {
        $this->city_id = $city_id;

        return $this;
    }

    public function getUserId(): ?Person
    {
        return $this->user_id;
    }

    public function setUserId(?Person $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * @return Collection|PlaceType[]
     */
    public function getPlacetypes(): Collection
    {
        return $this->placetypes;
    }

    public function addPlacetype(PlaceType $placetype): self
    {
        if (!$this->placetypes->contains($placetype)) {
            $this->placetypes[] = $placetype;
        }

        return $this;
    }

    public function removePlacetype(PlaceType $placetype): self
    {
        if ($this->placetypes->contains($placetype)) {
            $this->placetypes->removeElement($placetype);
        }

        return $this;
    }

    /**
     * @return Collection|Accessibility[]
     */
    public function getAccessibilities(): Collection
    {
        return $this->accessibilities;
    }

    public function addAccessibility(Accessibility $accessibility): self
    {
        if (!$this->accessibilities->contains($accessibility)) {
            $this->accessibilities[] = $accessibility;
        }

        return $this;
    }

    public function removeAccessibility(Accessibility $accessibility): self
    {
        if ($this->accessibilities->contains($accessibility)) {
            $this->accessibilities->removeElement($accessibility);
        }

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->Posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->Posts->contains($post)) {
            $this->Posts[] = $post;
            $post->setPlace($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->Posts->contains($post)) {
            $this->Posts->removeElement($post);
            // set the owning side to null (unless already changed)
            if ($post->getPlace() === $this) {
                $post->setPlace(null);
            }
        }

        return $this;
    }
}
