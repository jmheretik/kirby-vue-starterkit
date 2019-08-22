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
        'routes' => [
            [
                'pattern' => '/kt/(:any)',
                'action'  => function ($pageId) {
                    $pageId = str_replace('+', '/', $pageId);
                    $fields = explode(',', get('select'));

                    if ($page = page($pageId)) {
                        foreach ($fields as $field) {
                            $result['data'][$field] = $page->$field()->kirbytext();
                        }
                        return $result;
                    }
                }
            ],
            [
                'pattern' => '/(:alpha)/(:any)/file/(:any)',
                'action'  => function ($method, $pageId, $fileId) {
                    if ($method !== 'resize' && $method !== 'crop') return;

                    $pageId = str_replace('+', '/', $pageId);

                    if ($page = page($pageId)) {
                        if ($file = $page->file($fileId)) {
                            return [
                                'data' => $file->$method(get('w'), get('h'))->url()
                            ];
                        }
                    }
                }
            ]
          ]
    ]
];
