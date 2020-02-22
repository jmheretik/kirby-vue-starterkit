<?php

/**
 * The config file is optional. It accepts a return array with config options
 * Note: Never include more than one return statement, all options go within this single return array
 * In this example, we set debugging to true, so that errors are displayed onscreen. 
 * This setting must be set to false in production.
 * All config options: https://getkirby.com/docs/reference/system/options
 */
return [
    'debug' => true,

    'api' => [
        'basicAuth' => true,
        'allowInsecure' => true,

        // api extensions
        'routes' => [
            [
                // get kirbytext
                'pattern' => '/pages/(:any)/kt',
                'action'  => function ($pageId) {
                    $pageId = str_replace('+', '/', $pageId);

                    // fields specified in url 'select' parameter delimited by ','
                    $fields = explode(',', get('select'));

                    if ($page = page($pageId)) {
                        foreach ($fields as $field) {
                            $result['data'][$field] = $page->$field()->kirbytext()->value();
                        }
                        return $result;
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
                    $params = json_decode(get('params'));
                    if (!is_array($params)) $params = [$params];

                    if ($page = page($pageId)) {
                        if ($file = $page->file($fileId)) {
                            return ['data' => $file->$method(...$params)->url()];
                        }
                    }
                }
            ]
          ]
    ]
];
