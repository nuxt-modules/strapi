# @nuxtjs/strapi

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

>

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/strapi` dependency to your project

```bash
yarn add @nuxtjs/strapi # or npm install @nuxtjs/strapi
```

2. Add `@nuxtjs/strapi` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/strapi'
  ]
}
```

## Options

You can define the options in the `strapi`  property of your `nuxt.config.js`:

```js
export default {
  strapi: {
    url: 'http://localhost:1337'
  }
}
```

You can also give the Strapi URL with `STRAPI_URL` environement.


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Benjamin Canac <canacb1@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/strapi/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/strapi

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/strapi.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/strapi

[github-actions-ci-src]: https://github.com/nuxt-company/strapi-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-company/strapi-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/.svg
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/@nuxtjs/strapi.svg
[license-href]: https://npmjs.com/package/@nuxtjs/strapi
