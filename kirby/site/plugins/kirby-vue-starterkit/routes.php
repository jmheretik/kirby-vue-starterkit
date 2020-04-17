<?php

/**
 * Redirect all non-json templates to vue index (https://router.vuejs.org/guide/essentials/history-mode.html).
 * Taken from https://getkirby.com/docs/guide/routing#defining-your-own-routes
 */
return [
    [
        // match everything that doesn't end with .json
        'pattern' => ['', '(.*)(?<!\.json)'],
        'action'  => function ($pageId = 'home') {
            return tpl::load(kirby()->root('plugins') . '/kirby-vue-starterkit/vue-index.php', ['site' => site(), 'page' => page($pageId) ?? page('error')], false);
        }
    ]
];