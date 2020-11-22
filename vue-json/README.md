## Setup

```
npm install
```

To customize the configuration see Vue CLI [Configuration Reference](https://cli.vuejs.org/config/).

## Usage

#### serve development build with hot-reload

```
npm run dev
```

#### compile production build

```
npm run build
```

## Config

All the default config is loaded from the [.env](.env) file:

- `VUE_APP_BASE_URL` see https://cli.vuejs.org/config/#publicpath
- `VUE_APP_KIRBY_URL` specifies the URL where kirby is hosted (used for dev proxy, rewriting relative links in KirbyText, fetching JSON content...)

As usual in a Vue.js app, if you need to specify different values for the _production_ mode - create an **.env.production** file and values provided there will overwrite the default ones.

More info here: https://cli.vuejs.org/guide/mode-and-env.html#environment-variables.

## Deploying

Deploy the contents of `dist` folder to the production server at the corresponding publicPath.

> ⚠️ doesn't apply if you're injecting into kirby

## Notes

- Vue.js `page` composable in the [src/composables/use-page.js](src/composables/use-page.js) file roughly corresponds to the Kirby's `$page` object, but only the functionality needed for starterkit is present.
- Vue.js components in the [src/components](src/components) folder correspond to Kirby snippets.
- Vue.js views in the [src/views](src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
  - If you add a new page in Kirby with a new blueprint you also need to manually add a new **View** here and a new **.json** template in the backend to provide the frontend with the data you require.
