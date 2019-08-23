# kirby-vue-starterkit

This is a proof-of-concept project which uses [Kirby](https://getkirby.com/) as a headless CMS at the backend and [Vue.js](https://vuejs.org/) as a UI library at the frontend. The communication in between is handled using the [Kirby's REST API](https://getkirby.com/docs/guide/api/introduction).

Snippets, templates and their specific JS/CSS from the Kirby [Starterkit](https://github.com/getkirby/starterkit) have been ported to Vue.js [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).  
This project is trying to be a simple, zero-setup straightforward, 1:1 port with the least possible modifications done to the original Starterkit in order to serve as a nice starting point for people wanting to use Vue.js with Kirby.

The project benefits from all the standard tools used in modern frontend development. For more details visit: [Vue CLI](https://cli.vuejs.org/).

## Requirements

- Node.js with npm is required to install the project
- Kirby runs on PHP 7.1+

## Project setup

### Frontend
```
npm install
```
- to customize configuration see [Configuration Reference](https://cli.vuejs.org/config/)

### Backend

- out of the box the backend is served using the PHP built-in development server, however:
  - you can serve it any way you want but remember to specify the address in the [backend.js](backend.js) file

1. if using the built-in server, run it with `npm run serve:backend`
2. open kirby panel and create a new user with preconfigured read-only role **Api**
3. add its credentials to the [.env.local](.env.local) file

## Usage

### Serves both backend and frontend
```
npm start
```

### Runs Kirby 3 backend using PHP built-in development server
```
npm run serve:backend
```

### Compiles Vue frontend and hot-reloads for development
```
npm run serve:frontend
```

### Lints and fixes files
```
npm run lint
```

### Compiles and minifies for production
```
npm run build
```

**Don't forget to:**
- adjust public paths in [.env.production](.env.production) file
- adjust `RewriteBase` in [public/.htaccess](public/.htaccess) file to match the frontend's public path
- set `debug` and `allowInsecure` (if you're deploying to https) to **false** in [backend/site/config/config.php](backend/site/config/config.php)

Deploy the contents of `backend` and `frontend` folders to the same server to their corresponding public paths.

## Notes

- Vue.js components in [src/components](src/components) folder correspond to Kirby snippets.
- Vue.js views in in [src/views](src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
- If you add a new page with a new blueprint you also need to manually add a new **View** (exactly as you would add a new **Template** if you were working on a frontend in Kirby).
- Vue.js mixin `page` [src/components/mixins/page.js](src/components/mixins/page.js) roughly corresponds to the `$page` object in Kirby, but only the functionality needed in Starterkit is present.

- For now there is no nice way how to get a `kirbytext` of a field or how to `resize` or `crop` an image easily using the Kirby REST API so for that some custom endpoints have been added ([backend/site/config/config.php](backend/site/config/config.php)).
  - This being the only modification done to the Kirby Starterkit.
  - It will be removed in future if a nicer solution gets exposed by Kirby.
