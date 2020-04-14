<?php

/**
 * Redirect all non-json templates to vue index (https://router.vuejs.org/guide/essentials/history-mode.html).
 * Taken from https://getkirby.com/docs/guide/routing#defining-your-own-routes
 */
return [
    [
        'pattern' => ['.json', '(:all).json'],
        'action'  => function ($pageId = 'home') {
            kirby()->response()->json();
            return (page($pageId) ?? page('error'))->render([], 'json');
        }
    ],
    [
        'pattern' => ['(.*)'],
        'action'  => function ($pageId = 'home') {
            return tpl::load(kirby()->roots()->snippets() . DS . 'vue-index.php', ['site' => site(), 'page' => page($pageId) ?? page('error')], false);
        }
    ]
];