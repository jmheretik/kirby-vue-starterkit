## Setup

```
npm install
```

For a more detailed explanation on how Nuxt works, check out the [Nuxt.js docs](https://nuxtjs.org).

## Usage

#### serve development build with hot-reload

```
npm run dev
```

#### compile production SPA build

```
npm run build
```

#### generate full static build

```
npm run generate
```

#### serve full static build

```
npm run start
```

> ⚠️ No SSR build support for now. Only SPA build and statically generated site is supported.

## Config

All the default config is loaded from the [.env](.env) file:

- `NUXT_ENV_BASE_URL` see https://cli.vuejs.org/config/#publicpath and https://nuxtjs.org/api/configuration-router#base
- `NUXT_ENV_KIRBY_URL` specifies the URL where kirby is hosted (used for dev proxy, rewriting relative links in KirbyText, fetching JSON content...)
- `NUXT_ENV_IMG_DIR` specifies the name of a directory where scraped images will be downloaded (when using _static_ mode)

As usual in a Vue.js app, if you need to specify different values for the _production_ or _static_ mode - create an **.env.production** or **.env.static** file and values provided there will overwrite the default ones.

More info here: https://cli.vuejs.org/guide/mode-and-env.html#environment-variables.

## Deploying

Deploy the contents of `dist` folder to the production server at the corresponding publicPath.

> ⚠️ doesn't apply if you're injecting into kirby

## Notes

- Vue.js `page` mixin in the [mixins/page.js](mixins/page.js) file roughly corresponds to the Kirby's `$page` object, but only the functionality needed for starterkit is present.
- Vue.js components in the [components](components) folder correspond to Kirby snippets.
- Nuxt.js pages in the [pages](pages) folder correspond to Kirby templates and the routes are being automatically resolved.
  - If you add a new page in Kirby with a new blueprint you also need to manually add a new **page** here and a new **.json** template in the backend to provide the frontend with the data you require.
  - For a more detailed discussion on how are the routes generated based on the file hierarchy inside this folder, please visit https://nuxtjs.org/guide/routing.
