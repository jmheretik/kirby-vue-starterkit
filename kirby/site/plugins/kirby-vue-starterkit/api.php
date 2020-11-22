<?php

/**
 * API endpoints for getting kirbytext and file thumbs.
 * Taken from https://getkirby.com/docs/reference/plugins/extensions/api#custom-endpoints
 */
return [
    'routes' => [
        [
            // get kirbytext
            'pattern' => '/pages/(:any)/kt',
            'action'  => function ($pageId) {
                $pageId = str_replace('+', '/', $pageId);

                // fields specified in url
                $fields = explode(',', get('select'));

                if ($page = page($pageId)) {
                    return Response::json(['data' => 
                        array_combine($fields, array_map(function($field) use ($page) {
                            return $page->$field()->kt()->value();
                        },  $fields))
                    ]);
                }
            }
        ],
        [
            // get file thumb
            'pattern' => '/pages/(:any)/files/(:any)/thumb',
            'action'  => function ($pageId, $fileId) {
                $pageId = str_replace('+', '/', $pageId);

                // method and its parameters specified in url
                $method = get('method');
                $params = explode(',', get('params'));

                if ($page = page($pageId)) {
                    if ($file = $page->file($fileId)) {
                        return Response::json(['data' => $file->$method(...$params)->url()]);
                    }
                }
            }
        ]
        ]
];
