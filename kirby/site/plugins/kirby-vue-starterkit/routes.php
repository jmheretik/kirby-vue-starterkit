<?php

/**
 * Custom routes to get site languages and info.
 * Taken from https://getkirby.com/docs/guide/routing#defining-your-own-routes
 */

$routes = [
    [
        'pattern' => 'languages.json',
        'action' => function () {
            return Response::json(array_values(kirby()->languages()->map(function ($language) {
                return [
                    'code' => $language->code(),
                    'title' => $language->name(),
                    'prefix' => $language->path(),
                    'isDefault' => $language->isDefault()
                ];
            })->data()));
        }
    ],
    [
        'pattern' => 'site.json',
        'language' => '*',
        'action' => function () {
            return Response::json([
                'title' => site()->title()->value(),
                'children' => array_values(site()->children()->published()->map(function ($child) {
                  return [
                    'uri' => $child->uri(),
                    'title' => $child->title()->value(),
                    'template' => $child->intendedTemplate()->name(),
                    'isListed' => $child->isListed(),
                    'children' => array_values($child->children()->published()->map(function ($grandChild) {
                      return [
                        'uri' => $grandChild->uri(),
                        'template' => $grandChild->intendedTemplate()->name()
                      ];
                    })->data())
                  ];
                })->data()),
                'social' => array_values(page('about')->social()->toStructure()->map(function ($social) {
                  return [
                    'url' => $social->url()->value(),
                    'platform' => $social->platform()->value()
                  ];
                })->data())
            ]);
        }
    ],
];

return array_merge($routes, option('kirby-vue-starterkit.plugin.useVueIndex') ? [
    [
        // redirect everything that doesn't end with .json to vue index (https://router.vuejs.org/guide/essentials/history-mode.html)
        'pattern' => ['', '(.*)(?<!\.json)'],
        'action'  => function ($pageId = 'home') {
            return tpl::load(kirby()->root('plugins') . '/kirby-vue-starterkit/vue-index.php', ['site' => site(), 'page' => page($pageId) ?? page('error')], false);
        }
    ]
] : []);