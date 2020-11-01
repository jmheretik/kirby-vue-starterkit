# Kirby + Vue.js starterkit

This project aims to be a starting point for people wanting to use [Vue.js](https://vuejs.org) with [Kirby](https://getkirby.com) as headless CMS.

It's a simple, zero-setup, 1:1 port of the [Kirby 3 starterkit](https://github.com/getkirby/starterkit) frontend (snippets, templates and their corresponding JS/CSS) to Vue.js [single file components](https://vuejs.org/v2/guide/single-file-components.html).

You can benefit from all the standard tools used in modern frontend development. For more details visit [Vue CLI](https://cli.vuejs.org/).

---

The frontend comes in 3 different flavours:

1. **API** - the [vue-api](vue-api) folder. The content is fetched using the Kirby's [built-in REST API](https://getkirby.com/docs/guide/api/introduction). This was made like a proof-of-concept project and needed a few workarounds to work properly.

2. **JSON** - the [vue-json](vue-json) folder. Here, the content is fetched using [JSON content representations](https://getkirby.com/docs/guide/templates/content-representations), which proved to be a much more suitable approach for now.

3. **NUXT** - the [vue-nuxt](vue-nuxt) folder. Finally, this project too uses JSON content representations to fetch the content but also includes many of the goodies [Nuxt.js](https://nuxtjs.org) has to offer (including the static site generation)!

## Demo

- [API](https://index.heretik.dev/kirby-vue-starterkit/vue-api)
- [JSON](https://index.heretik.dev/kirby-vue-starterkit/vue-json)
- [NUXT](https://index.heretik.dev/kirby-vue-starterkit/vue-nuxt)
- [NUXT static site](https://jmheretik.github.io/kirby-vue-starterkit) (hosted here in gh-pages branch, as a proof :)
- [original starterkit](https://index.heretik.dev/kirby-starterkit) (for comparison)

> ℹ️ inspect the network traffic to see the differences

## Requirements

- Node.js with npm is required to install the projects
- Kirby runs on PHP 7.1+
  - Kirby is **not** a free software. You can try it for free on your local machine but in order to run Kirby on a public server you must purchase a valid license at https://getkirby.com/buy

## Setup

1. choose the frontend variant that suits you best
2. `cd` into its folder
3. run `npm install`

## Usage

#### frontend

✔️ Make sure to follow the README in the project folder of your chosen variant.

#### backend

Out of the box the backend is automatically served while developing using the PHP built-in development server.

## Config

All Kirby related config is found in the [kirby.config.js](kirby.config.js) file:

- `serve` specifies if you want the backend to be automatically served while developing
  - `host` and `port` specifies the adress where you want it served
- `inject` specifies if you want the built Vue app to be injected straight to Kirby
  - this is useful if you want to _replace_ Kirby's frontend with your Vue app (e.g. you want your Vue app to reside in the same directory and URL as Kirby and have it handle all your frontend _instead of_ Kirby's templates)
  - if this is **true** remember to also set `kirby-vue-starterkit.plugin.useVueIndex` in [kirby/site/config/config.php](kirby/site/config/config.php) to **true** as well, so that everything is redirected to your Vue app instead of Kirby's templates
  - `base`, `assetsDir` and `indexPath` specify where you want to inject the parts of the built Vue app

## Deploying

Deploy the contents of `kirby` folder to the production server.

> ⚠️ if you're also injecting into Kirby, make sure you build the Vue app _first_ so the `kirby` folder contains everything needed

> ⚠️ don't forget to set `debug` and `allowInsecure` (if you're deploying to https) to **false** in [kirby/site/config/config.php](kirby/site/config/config.php)

## Notes

I tried to make as little modifications to the original Starterkit as possible and package it all in an optional non-intrusive Kirby plugin. However, here is a list of all the changes made to the original starterkit:

- [kirby/site/blueprints/users/api.yml](kirby/site/blueprints/users/api.yml): added a read-only API user role
- [kirby/site/plugins/kirby-vue-starterkit](kirby/site/plugins/kirby-vue-starterkit): added a plugin which adds the neccessary extensions to Kirby
- [kirby/site/config/config.php](kirby/site/config/config.php): api and kirby-vue-starterkit plugin options configured
- [kirby/site/snippets/gallery.php](kirby/site/snippets/gallery.php): added data-id attribute to images for nuxt static site generation to work
- [kirby/site/templates/\*.json.php](kirby/site/templates): added .json templates for JSON content representations to work
