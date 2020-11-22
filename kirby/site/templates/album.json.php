<?php

$data = [
  'title' => $page->title()->value(),
  'headline' => $page->headline()->or($page->title())->value(),
  'description' => ['html' => $page->description()->kt()->value()],
  'tags' => $page->tags()->isNotEmpty() ? $page->tags()->value() : null,
  'cover' => $page->cover() === null ? null : ['html' => $page->cover()->crop(1024, 768)->html(['data-id' => $page->cover()->crop(1024, 768)->id()])],
  'gallery' => array_values($gallery->map(function ($image) {
    return [
      'link' => $image->link()->or($image->id())->value(),
      'html' => $image->crop(800, 1000)->html(['data-id' => $image->crop(800, 1000)->id()])
    ];
  })->data())
];

echo json_encode($data);
