# Kirby [API](https://github.com/jmheretik/kirby-api-vue-starterkit#kirby-apijson-vue-starterkit)/JSON Vue starterkit


This is a proof-of-concept project which uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as a UI library at the frontend. The content is fetched using the Kirby's [JSON content representation](https://getkirby.com/docs/guide/templates/content-representations).

- If you wish to use Kirby's [built-in REST API](https://getkirby.com/docs/guide/api/introduction) instead of the JSON content representation, check my other project [kirby-api-vue-starterkit](https://github.com/jmheretik/kirby-api-vue-starterkit).

Snippets, templates and their specific JS/CSS from the Kirby [Starterkit](https://github.com/getkirby/starterkit) have been ported to Vue.js [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).  
This project is trying to be a simple, zero-setup, straightforward, 1:1 port with the least possible modifications done to the original Starterkit in order to serve as a nice starting point for people wanting to use Vue.js with Kirby.

The project benefits from all the standard tools used in modern frontend development. For more details visit [Vue CLI](https://cli.vuejs.org/).

## Demo

https://index.heretik.dev/kirby-json-vue-starterkit (and the original starterkit for comparison is [here](https://index.heretik.dev/kirby-starterkit))

## Requirements

- Node.js with npm is required to install the project
- Kirby runs on PHP 7.1+
  - Kirby is **not** a free software. You can try it for free on your local machine but in order to run Kirby on a public server you must purchase a valid license at https://getkirby.com/buy

## Project setup

```
npm install
```
- to customize configuration see Vue CLI [Configuration Reference](https://cli.vuejs.org/config/)

## Usage

### Serves both backend and frontend
```
npm start
```

### Runs Kirby 3 backend using PHP built-in development server
```
npm run serve:backend
```
- out of the box the backend is served using the PHP built-in development server, however:
  - you can serve it any way you want but remember to specify the `host` and `port` in the [kirby.config.js](kirby.config.js) file


### Compiles Vue frontend and hot-reloads for development
```
npm run serve:frontend
```

### Lints and fixes files
```
npm run lint
```

### Compiles and minifies for production
Firstly, adjust the `publicPath` in [kirby.config.js](kirby.config.js) file (more info [here](https://cli.vuejs.org/config/#publicpath)). Then run:

```
npm run build
```

This builds the frontend assets in `www/assets` directory and the index file as a kirby snippet in `www/site/snippets/vue-index.php`.

### Deploying

- set `debug` to **false** in [www/site/config/config.php](www/site/config/config.php)

Deploy the contents of `www` folder to the production server at the corresponding publicPath.

## Notes

- Vue.js mixin `page` [src/mixins/page.js](src/mixins/page.js) roughly corresponds to the `$page` object in Kirby, but only the functionality needed in Starterkit is present.
- Vue.js components in [src/components](src/components) folder correspond to Kirby snippets.
- Vue.js views in in [src/views](src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
  - If you add a new page with a new blueprint you also need to manually add here a new **View** and a new JSON **Template** in the backend to provide the frontend with the data you require.
