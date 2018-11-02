<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CityRepository")
 */
class City
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $county;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $slug;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $simple_name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $real_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $postalCode;

    /**
     * @ORM\Column(type="smallint")
     */
    private $borough;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $longitude_deg;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $latitude_deg;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $longitude_dms;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $latitude_dms;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Person", mappedBy="city")
     */
    private $users;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Country", inversedBy="cities")
     * @ORM\JoinColumn(nullable=false)
     */
    private $country;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Place", mappedBy="city_id")
     */
    private $places;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->places = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountryId(): ?int
    {
//          $country = $this->country->getId();
//          dump($country);die;
        return $this->country->getId();
    }

    public function setCountryId(?int $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCounty(): ?string
    {
        return $this->county;
    }

    public function setCounty(?string $county): self
    {
        $this->county = $county;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getSimpleName(): ?string
    {
        return $this->simple_name;
    }

    public function setSimpleName(?string $simple_name): self
    {
        $this->simple_name = $simple_name;

        return $this;
    }

    public function getRealName(): ?string
    {
        return $this->real_name;
    }

    public function setRealName(?string $real_name): self
    {
        $this->real_name = $real_name;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getBorough(): ?int
    {
        return $this->borough;
    }

    public function setBorough(int $borough): self
    {
        $this->borough = $borough;

        return $this;
    }

    public function getLongitudeDeg(): ?float
    {
        return $this->longitude_deg;
    }

    public function setLongitudeDeg(?float $longitude_deg): self
    {
        $this->longitude_deg = $longitude_deg;

        return $this;
    }

    public function getLatitudeDeg(): ?float
    {
        return $this->latitude_deg;
    }

    public function setLatitudeDeg(?float $latitude_deg): self
    {
        $this->latitude_deg = $latitude_deg;

        return $this;
    }

    public function getLongitudeDms(): ?string
    {
        return $this->longitude_dms;
    }

    public function setLongitudeDms(?string $longitude_dms): self
    {
        $this->longitude_dms = $longitude_dms;

        return $this;
    }

    public function getLatitudeDms(): ?string
    {
        return $this->latitude_dms;
    }

    public function setLatitudeDms(?string $latitude_dms): self
    {
        $this->latitude_dms = $latitude_dms;

        return $this;
    }

    /**
     * @return Collection|Person[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addPerson(Person $person): self
    {
        if (!$this->users->contains($person)) {
            $this->users[] = $person;
            $person->setCityId($this);
        }

        return $this;
    }

    public function removePerson(Person $person): self
    {
        if ($this->people->contains($person)) {
            $this->people->removeElement($person);
            // set the owning side to null (unless already changed)
            if ($person->getCityId() === $this) {
                $person->setCityId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Place[]
     */
    public function getPlaces(): Collection
    {
        return $this->places;
    }

    public function addPlace(Place $place): self
    {
        if (!$this->places->contains($place)) {
            $this->places[] = $place;
            $place->setCityId($this);
        }

        return $this;
    }

    public function removePlace(Place $place): self
    {
        if ($this->places->contains($place)) {
            $this->places->removeElement($place);
            // set the owning side to null (unless already changed)
            if ($place->getCityId() === $this) {
                $place->setCityId(null);
            }
        }

        return $this;
    }

    public function __toString(){
        return $this->getRealName();
    }
}
