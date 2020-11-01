<?php

/**
 * Some kirby extensions needed for kirby-vue-starterkit to work properly.
 * Taken from https://getkirby.com/docs/guide/plugins/plugin-basics#extensions
 */
Kirby::plugin('kirby-vue-starterkit/plugin', [
    'options' => [
        'useVueIndex' => false
    ],
    'api' => array_merge(option('api', []), require_once __DIR__ . '/api.php'),
    'tags' => array_merge(option('tags', []), require_once __DIR__ . '/tags.php'),
    'routes' => array_merge(option('routes', []), require_once __DIR__ . '/routes.php')
]);