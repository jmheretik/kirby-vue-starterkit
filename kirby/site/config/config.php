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
        'allowInsecure' => true,
        'basicAuth' => true
    ],
    'kirby-vue-starterkit.plugin.useVueIndex' => false,
    'routes' => [
        [
            'pattern' => 'languages.json',
            'action'  => function () {
                return Response::json(array_values(kirby()->languages()->map(function ($language) {
                    return [
                        'code' => $language->code(),
                        'title' => $language->name(),
                        'prefix' => $language->path(),
                        'isDefault' => $language->isDefault()
                    ];
                })->data()));
            }
        ]
    ]
];
