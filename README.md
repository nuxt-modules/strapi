# strapi-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> 

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `strapi-module` dependency to your project

```bash
yarn add strapi-module # or npm install strapi-module
```

2. Add `strapi-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'strapi-module',

    // With options
    ['strapi-module', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Benjamin Canac <canacb1@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/strapi-module/latest.svg
[npm-version-href]: https://npmjs.com/package/strapi-module

[npm-downloads-src]: https://img.shields.io/npm/dt/strapi-module.svg
[npm-downloads-href]: https://npmjs.com/package/strapi-module

[github-actions-ci-src]: https://github.com//workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com//actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/.svg
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/strapi-module.svg
[license-href]: https://npmjs.com/package/strapi-module
