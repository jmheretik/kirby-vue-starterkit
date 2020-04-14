<?php

$data = [
  'title' => $page->title()->value(),
  'text' => ['html' => $page->text()->kt()->value()]
];

echo json_encode($data);