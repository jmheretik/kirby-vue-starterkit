<?php

/**
 * Redirect all html templates to vue index (https://router.vuejs.org/guide/essentials/history-mode.html).
 * Taken from https://getkirby.com/docs/guide/routing#defining-your-own-routes
 */
return [
    [
        // match everything that doesn't end with .json
        'pattern' => ['', '(.*)(?<!\.(json|nuxt))'],
        'action'  => function ($pageId = 'home') {
            return tpl::load(kirby()->roots()->snippets() . DS . 'vue-index.php', ['site' => site(), 'page' => page($pageId) ?? page('error')], false);
        }
    ]
];