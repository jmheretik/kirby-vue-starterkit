<?php

/**
 * Some kirby extensions needed for kirby-vue-starterkit to work properly.
 * Taken from https://getkirby.com/docs/guide/plugins/plugin-basics#extensions
 */
Kirby::plugin('kirby-vue-starterkit/plugin', [
    'options' => [
        'useVueIndex' => false
    ],
    'api' => require_once __DIR__ . '/api.php',
    'tags' => require_once __DIR__ . '/tags.php',
    'routes' => option('kirby-vue-starterkit.plugin.useVueIndex') ? require_once __DIR__ . '/routes.php' : null
]);