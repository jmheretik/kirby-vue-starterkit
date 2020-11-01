<?php

$data = [
  'title' => $page->title()->value()
];

echo json_encode($data);