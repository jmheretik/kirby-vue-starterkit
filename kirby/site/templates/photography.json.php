<?php

$data = [
  'title' => $page->title()->value(),
  'children' => array_values($page->children()->listed()->map(function ($album) {
    return [
      'uri' => $album->uri(),
      'title' => $album->title()->value(),
      'cover' => $album->cover() === null ? null : ['html' => $album->cover()->crop(800, 1000)->html(['data-id' => $album->cover()->crop(800, 1000)->id()])],
      'coverHome' => $album->cover() === null ? null : ['html' => $album->cover()->resize(1024, 1024)->html(['data-id' => $album->cover()->resize(1024, 1024)->id()])]
    ];
  })->data())
];

echo json_encode($data);
