<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 */
class Comment
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
    private $body;

    /**
     * @ORM\Column(type="datetime")
     */
    private $released_date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person", inversedBy="comments")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Post", inversedBy="comments")
     */
    private $post_id;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getReleasedDate(): ?\DateTimeInterface
    {
        return $this->released_date;
    }

    public function setReleasedDate(\DateTimeInterface $released_date): self
    {
        $this->released_date = $released_date;

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

    public function getPostId(): ?Post
    {
        return $this->post_id;
    }

    public function setPostId(?Post $post_id): self
    {
        $this->post_id = $post_id;

        return $this;
    }
}
