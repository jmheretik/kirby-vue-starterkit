<?php

return function($site, $pages, $page) {

  $pageTitle = $site->title() . ' | ' . $page->title();

  $pageDescription = $page->text()->excerpt(200)->or($page->description()->or($site->description()));

  $pageThumbnail = '';
  if ($image = $page->image()) { $pageThumbnail = $page->image()->resize(1200)->url(); }
  if ($pageThumbnail === '' && $image = $site->image()) { $pageThumbnail = $site->image()->resize(1200)->url(); }
  
  return [
    'pageTitle' => $pageTitle,
    'pageDescription' => $pageDescription,
    'pageThumbnail' => $pageThumbnail,
  ];
};
