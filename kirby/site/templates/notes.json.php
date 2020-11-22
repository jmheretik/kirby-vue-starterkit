<?php

$data = [
  'title' => $page->title()->value(),
  'children' => array_values($page->children()->listed()->sortBy('date', 'desc')->map(function ($note) {
    return [
      'uri' => $note->uri(),
      'title' => $note->title()->value(),
      'date' => $note->date()->toDate('d F Y')
    ];
  })->data())
];

echo json_encode($data);
