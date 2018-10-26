<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PostRepository")
 */
class Post
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="datetime")
     */
    private $released_date;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $positive_opinion;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $negative_opinion;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="post_id")
     */
    private $comments;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Place", inversedBy="Posts")
     */
    private $place;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person", inversedBy="posts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $author;

    public function __construct()
    {
        $this->released_date = new \DateTime();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

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

    public function getReleasedDate(): ?\DateTimeInterface
    {
        return $this->released_date;
    }

    public function setReleasedDate(\DateTimeInterface $released_date): self
    {
        $this->released_date = $released_date;

        return $this;
    }

    public function getPositiveOpinion(): ?int
    {
        return $this->positive_opinion;
    }

    public function setPositiveOpinion(?int $positive_opinion): self
    {
        $this->positive_opinion = $positive_opinion;

        return $this;
    }

    public function getNegativeOpinion(): ?int
    {
        return $this->negative_opinion;
    }

    public function setNegativeOpinion(?int $negative_opinion): self
    {
        $this->negative_opinion = $negative_opinion;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setPostId($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getPostId() === $this) {
                $comment->setPostId(null);
            }
        }

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(?Place $place): self
    {
        $this->place = $place;

        return $this;
    }

    public function getAuthor(): ?Person
    {
        return $this->author;
    }

    public function setAuthor(?Person $author): self
    {
        $this->author = $author;

        return $this;
    }
}
