## Setup
```
npm install
```
To customize the configuration see Vue CLI [Configuration Reference](https://cli.vuejs.org/config/).

First run:
1. start backend (just run `npm run dev` if you decided to serve backend automatically in [kirby.config.js](https://github.com/jmheretik/kirby-vue-starterkit#config))
2. open kirby panel and create a new user with preconfigured read-only role **API**
3. add its credentials to the [.env](.env) file


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
- `VUE_APP_KIRBY_URL` specifies the URL where kirby is hosted (used for dev proxy, rewriting relative links in KirbyText...)
- `VUE_APP_API_SLUG` together with *VUE_APP_KIRBY_URL* completes the base URL for the REST API
- `VUE_APP_API_EMAIL` and `VUE_APP_API_PASSWORD` specify credentials for the REST API

As usual in a Vue.js app, if you need to specify different values for the *production* mode - create an **.env.production** file and values provided there will overwrite the default ones.

More info here: https://cli.vuejs.org/guide/mode-and-env.html#environment-variables.


## Deploying

Deploy the contents of `dist` folder to the production server at the corresponding publicPath.

> ⚠️ doesn't apply if you're injecting into kirby


## Notes

- Vue.js `page` mixin in the [src/mixins/page.js](src/mixins/page.js) file roughly corresponds to the Kirby's `$page` object, but only the functionality needed for starterkit is present.
- Vue.js components in the [src/components](src/components) folder correspond to Kirby snippets.
- Vue.js views in the [src/views](src/views) folder correspond to Kirby templates and the routes are being automatically resolved.
  - If you add a new page in Kirby with a new blueprint you also need to manually add a new **View** (exactly as you would add a new **Template** if you were using the Kirby's frontend).
  
- For now there is no nice way how to get an image's `thumb` or field's `kirbytext` easily using the Kirby REST API so for that the API was extended with some custom endpoints.
  - It will be removed in future if a nicer solution gets exposed by Kirby.
