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

    // redirect everything (except json content) to vue app (https://router.vuejs.org/guide/essentials/history-mode.html)
    'routes' => [
        [
            'pattern' => ['(?!(:all).json)(.*)'],
            'action'  => function ($pageId = 'home') {
                return page($pageId) ?? page('error');
            }
        ],
        [
            'pattern' => ['(.*)'],
            'action'  => function ($pageId = 'home') {
                return tpl::load(kirby()->roots()->snippets() . DS . 'vue-index.php', ['site' => site(), 'page' => page($pageId) ?? page('error')], false);
            }
        ]
    ]
];
