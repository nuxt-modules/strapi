# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.6.2](https://github.com/nuxt-community/strapi-module/compare/v1.6.1...v1.6.2) (2022-11-16)

### [1.6.1](https://github.com/nuxt-community/strapi-module/compare/v1.6.0...v1.6.1) (2022-09-29)


### Bug Fixes

* **useStrapi:** methods typings ([ac986de](https://github.com/nuxt-community/strapi-module/commit/ac986de127f6cb78b5515e4161b7aad3d01aa639))

## [1.6.0](https://github.com/nuxt-community/strapi-module/compare/v1.5.1...v1.6.0) (2022-09-27)


### Features

* add `useStrapi` composable with correct types ([#279](https://github.com/nuxt-community/strapi-module/issues/279)) ([43f76a7](https://github.com/nuxt-community/strapi-module/commit/43f76a721451376a5d3285e70b99ce55ddb7925c))

### [1.5.1](https://github.com/nuxt-community/strapi-module/compare/v1.5.0...v1.5.1) (2022-09-05)


### Bug Fixes

* **example:** missing app.vue ([df0f757](https://github.com/nuxt-community/strapi-module/commit/df0f757e3b6b50e457604f76ec974ab79f6f34a1))

## [1.5.0](https://github.com/nuxt-community/strapi-module/compare/v1.4.0...v1.5.0) (2022-07-18)


### Features

* make cookie name configurable ([#265](https://github.com/nuxt-community/strapi-module/issues/265)) ([e52e97d](https://github.com/nuxt-community/strapi-module/commit/e52e97d56ac979124d24a42a80a789c8c3f5bf26))
* **module:** add `auth.populate` option for `fetchUser` ([#260](https://github.com/nuxt-community/strapi-module/issues/260)) ([f9fa58b](https://github.com/nuxt-community/strapi-module/commit/f9fa58b6d779e41a21be1a21413117e52b1ffb86))


### Bug Fixes

* **docs:** hydration issue on changelog ([cc39098](https://github.com/nuxt-community/strapi-module/commit/cc39098f817fc3c52d2048dba48ce56551d49bfd))
* **docs:** rename `buildModules` to `modules` ([#263](https://github.com/nuxt-community/strapi-module/issues/263)) ([0c6de92](https://github.com/nuxt-community/strapi-module/commit/0c6de92c362ef909881457c08d034730848dbe2c))

## [1.4.0](https://github.com/nuxt-community/strapi-module/compare/v1.3.2...v1.4.0) (2022-06-09)


### Features

* **module:** support server-specific runtime configuration ([#247](https://github.com/nuxt-community/strapi-module/issues/247)) ([3ee5b2a](https://github.com/nuxt-community/strapi-module/commit/3ee5b2a45a2341719a808e0885cab7903b201e31))
* **useStrapiGraphQL:** support for imported graphql files ([#249](https://github.com/nuxt-community/strapi-module/issues/249)) ([0dfee89](https://github.com/nuxt-community/strapi-module/commit/0dfee89ce6a32bfe938781c5551b413d71fc219a))


### Bug Fixes

* **useStrapiClient:** prevent `?` suffix with undefined params ([14eaac5](https://github.com/nuxt-community/strapi-module/commit/14eaac5ff9b593ca6806e13a089f0919990b2d0b))
* **useStrapiGraphQL:** add missing header preventing successful graphql requests ([#248](https://github.com/nuxt-community/strapi-module/issues/248)) ([7fb2755](https://github.com/nuxt-community/strapi-module/commit/7fb27554b80e30610a9d539d1272e0934cd35b70))

### [1.3.2](https://github.com/nuxt-community/strapi-module/compare/v1.3.1...v1.3.2) (2022-04-13)


### Bug Fixes

* **module:** defu default import after v6 upgrade ([97dcc4e](https://github.com/nuxt-community/strapi-module/commit/97dcc4e3e2fe820da09c42b5f97089d4efc0ab06))
* **module:** update runtime config override ([#244](https://github.com/nuxt-community/strapi-module/issues/244)) ([b7adc16](https://github.com/nuxt-community/strapi-module/commit/b7adc16da19c76c626392f7ac597fef54ea1a0ce))

### [1.3.1](https://github.com/nuxt-community/strapi-module/compare/v1.3.0...v1.3.1) (2022-03-02)


### Bug Fixes

* don't override vite config ([#232](https://github.com/nuxt-community/strapi-module/issues/232)) ([e722d34](https://github.com/nuxt-community/strapi-module/commit/e722d34b6d4a69e1b7d34d3807b636ba82a4b452))

## [1.3.0](https://github.com/nuxt-community/strapi-module/compare/v1.2.0...v1.3.0) (2022-02-07)


### Features

* custom payload properties for registration ([#218](https://github.com/nuxt-community/strapi-module/issues/218)) ([28e4179](https://github.com/nuxt-community/strapi-module/commit/28e417926e992173f85035df0f382f84df40fb8a))
* **module:** Add pre commit linting ([#223](https://github.com/nuxt-community/strapi-module/issues/223)) ([4e996be](https://github.com/nuxt-community/strapi-module/commit/4e996be0ea8a58a715e09057bb179bdc231e8c86))


### Bug Fixes

* **client:** Update returned error ([#222](https://github.com/nuxt-community/strapi-module/issues/222)) ([f99c6e8](https://github.com/nuxt-community/strapi-module/commit/f99c6e8cbed9e8117d9a105cce41f7179253b17b))
* **module:** improve bridge compatibility ([70f73af](https://github.com/nuxt-community/strapi-module/commit/70f73af859b77471101d7a8bd23a80ac5d9a3cb1))
* **useStrapiAuth:** getProviderAuthenticationUrl fails to concat with prefix ([2f087f1](https://github.com/nuxt-community/strapi-module/commit/2f087f11a7c186a52978e64c469adbcd90a38c4c))

## [1.2.0](https://github.com/nuxt-community/strapi-module/compare/v1.1.0...v1.2.0) (2022-01-20)


### Features

* add cookie config ([#208](https://github.com/nuxt-community/strapi-module/issues/208)) ([0baf7e0](https://github.com/nuxt-community/strapi-module/commit/0baf7e0a38582b3e70d7028f40cafd0600f603b3))


### Bug Fixes

* **client:** Use strapi v4 format for query ([#212](https://github.com/nuxt-community/strapi-module/issues/212)) ([eaf21fa](https://github.com/nuxt-community/strapi-module/commit/eaf21faaf35f7d4ca9f4f0eb765a03d6268ed0dd))
* lint ([1e1214e](https://github.com/nuxt-community/strapi-module/commit/1e1214eb88d42e2cdacaa272b8b282fd80b4231a))
* **module:**  option type value ([6ad2e38](https://github.com/nuxt-community/strapi-module/commit/6ad2e38ec4434db1d0dd1342502322eebd845948))
* **module:** `qs` import ([6c80fb7](https://github.com/nuxt-community/strapi-module/commit/6c80fb741691c1726ebf6e912620c97b1460629f))
* **module:** add `qs` to transpile ([29350d7](https://github.com/nuxt-community/strapi-module/commit/29350d74406f54da2f5e7457940d90778da7f531))
* **module:** add alias to  dist ([8f37003](https://github.com/nuxt-community/strapi-module/commit/8f370039bc70db2cabee2ad7cc3e1abbee7e471e))
* **module:** exclude  from vite ([b5e51f0](https://github.com/nuxt-community/strapi-module/commit/b5e51f0889e484b0e616c1faf31cf0a36ae94f41))
* **module:** remove transpile for `qs` ([cd12e1b](https://github.com/nuxt-community/strapi-module/commit/cd12e1b7600a7ca97cc65ac1fcf2474a4b8271e3))
* **useStrapiClient:** `qs` import ([97d0df8](https://github.com/nuxt-community/strapi-module/commit/97d0df840e03cb7b21bb035f43b3f2977ffcf170))

## [1.1.0](https://github.com/nuxt-community/strapi-module/compare/v1.0.0...v1.1.0) (2022-01-11)


### Features

* add `useStrapiGraphQL` composable ([11402ee](https://github.com/nuxt-community/strapi-module/commit/11402ee695d6fc8640bd96526e1eba0a16b1d36c))

## [1.0.0](https://github.com/nuxt-community/strapi-module/compare/v0.3.4...v1.1.0) (2022-01-10)


### Features

* migrate module to nuxt3 + support strapi v4 ([#183](https://github.com/nuxt-community/strapi-module/issues/183)) ([0d8d49b](https://github.com/nuxt-community/strapi-module/commit/0d8d49b23f35d8038dbd2ff6f3b099f983c340b0))
* module improvements ([#188](https://github.com/nuxt-community/strapi-module/issues/188)) ([bceac81](https://github.com/nuxt-community/strapi-module/commit/bceac813c13b8d32aa070730c89b042380354de6))
* move auth methods into own `useStrapiAuth` composable ([b150c2f](https://github.com/nuxt-community/strapi-module/commit/b150c2fd78c57832a458d06ffee9b566d20457b6))


### Bug Fixes

* **example:** module import ([c460617](https://github.com/nuxt-community/strapi-module/commit/c4606172ecb79bd0d5149daa3da280415ae50c4e))
* **module:** defu config priority ([a340a7a](https://github.com/nuxt-community/strapi-module/commit/a340a7a5b4b70149c6574720a26f8371532e3bae))
* **plugins:** missing `defineNuxtPlugin` ([d05ace9](https://github.com/nuxt-community/strapi-module/commit/d05ace9fedc88a9acdc6292497969009ac96635b))
* **plugins:** missing imports ([d5edd08](https://github.com/nuxt-community/strapi-module/commit/d5edd08c7ff26bf34bb80cdcab5fd3d89afdaeb9))
* **plugins:** use new `useStrapiAuth` composable ([e7115f1](https://github.com/nuxt-community/strapi-module/commit/e7115f11871e78fde4eb7d65d01dd6e7b7467173))
* provide exports without condition ([27afa67](https://github.com/nuxt-community/strapi-module/commit/27afa677a0f1b95fa677bf59f8d3638effe1e234))
* **useStrapi4:** id is not optional ([0e22989](https://github.com/nuxt-community/strapi-module/commit/0e229896e12bb30d0294bdfe2e4985f747cd2f4d))
* **useStrapiToken:** implement caching ([6e25a4a](https://github.com/nuxt-community/strapi-module/commit/6e25a4a884858590982a1efabc61a353d7e07dd3))

### [0.3.4](https://github.com/nuxt-community/strapi-module/compare/v0.3.3...v0.3.4) (2021-11-10)

### [0.3.3](https://github.com/nuxt-community/strapi-module/compare/v0.3.2...v0.3.3) (2021-10-15)

### [0.3.2](https://github.com/nuxt-community/strapi-module/compare/v0.3.1...v0.3.2) (2021-10-15)


### Features

* **strapi:** handle query params in `findOne` method ([#167](https://github.com/nuxt-community/strapi-module/issues/167)) ([1c82fd6](https://github.com/nuxt-community/strapi-module/commit/1c82fd6fdc4b0c4ee173f751e05d38c3b2153cc8))


### Bug Fixes

* broken links to Strapi API parameters page ([#140](https://github.com/nuxt-community/strapi-module/issues/140)) ([4cda013](https://github.com/nuxt-community/strapi-module/commit/4cda013c73e86a5c3f3303ed0372d73be9746663))

### [0.3.1](https://github.com/nuxt-community/strapi-module/compare/v0.3.0...v0.3.1) (2021-03-25)


### Bug Fixes

* upgrade `ufo` ([#122](https://github.com/nuxt-community/strapi-module/issues/122)) ([41c99a2](https://github.com/nuxt-community/strapi-module/commit/41c99a214a80a8362d7c364f16da099990413acb))

## [0.3.0](https://github.com/nuxt-community/strapi-module/compare/v0.1.11...v0.3.0) (2021-01-19)

### [0.1.13](https://github.com/nuxt-community/strapi-module/compare/v0.1.11...v0.1.13) (2021-01-19)

### [0.1.12](https://github.com/nuxt-community/strapi-module/compare/v0.1.11...v0.1.12) (2021-01-19)

### [0.1.11](https://github.com/nuxt-community/strapi-module/compare/v0.1.9...v0.1.11) (2021-01-19)


### Features

* added typescript support and updated docs accordingly ([#94](https://github.com/nuxt-community/strapi-module/issues/94)) ([64f1927](https://github.com/nuxt-community/strapi-module/commit/64f1927c2a412d0b8c0c8920431b1dbe30f35f2b))
* module improvements ([#96](https://github.com/nuxt-community/strapi-module/issues/96)) ([de5be3b](https://github.com/nuxt-community/strapi-module/commit/de5be3b72ad36e5e531cca1c5fe6d50d15ec51dc))

### [0.1.10](https://github.com/nuxt-community/strapi-module/compare/v0.1.9...v0.1.10) (2021-01-08)


### Features

* added typescript support and updated docs accordingly ([#94](https://github.com/nuxt-community/strapi-module/issues/94)) ([64f1927](https://github.com/nuxt-community/strapi-module/commit/64f1927c2a412d0b8c0c8920431b1dbe30f35f2b))

### [0.1.9](https://github.com/nuxt-community/strapi-module/compare/v0.1.8...v0.1.9) (2020-12-18)


### Features

* support proxy and add localStorage ([#87](https://github.com/nuxt-community/strapi-module/issues/87)) ([2e08ec6](https://github.com/nuxt-community/strapi-module/commit/2e08ec683a6ea3c3a8c7df39a98dcbb85e5102b0))

### [0.1.8](https://github.com/nuxt-community/strapi-module/compare/v0.1.7...v0.1.8) (2020-11-02)


### Bug Fixes

* **lib:** dont fetch user on server with target static ([#68](https://github.com/nuxt-community/strapi-module/issues/68)) ([0a74b5a](https://github.com/nuxt-community/strapi-module/commit/0a74b5a263b8721102be70ec2608bb118cd1fcf3))

### [0.1.7](https://github.com/nuxt-community/strapi-module/compare/v0.1.6...v0.1.7) (2020-10-08)


### Features

* Tiny change to plugin.js to reduce the size of lodash on build ([#45](https://github.com/nuxt-community/strapi-module/issues/45)) ([8b59046](https://github.com/nuxt-community/strapi-module/commit/8b5904693446b592a308fe8c028e26ddb1e372eb))


### Bug Fixes

* **lib:** better error handling ([58a9d17](https://github.com/nuxt-community/strapi-module/commit/58a9d17ec3be63fd837bf1d273ba5b298221f54e))

### [0.1.6](https://github.com/nuxt-community/strapi-module/compare/v0.1.5...v0.1.6) (2020-08-25)

### [0.1.5](https://github.com/nuxt-community/strapi-module/compare/v0.1.4...v0.1.5) (2020-08-21)


### Features

* handle single-type entity type ([#35](https://github.com/nuxt-community/strapi-module/issues/35)) ([04b440b](https://github.com/nuxt-community/strapi-module/commit/04b440b105ecb63932d98d5e3a64fd265919353b))


### Bug Fixes

* **plugin:** reactivity on hydatation ([#34](https://github.com/nuxt-community/strapi-module/issues/34)) ([b7e764f](https://github.com/nuxt-community/strapi-module/commit/b7e764f50f70ad68012fcc4a6f8d769f6ae27b67))

### [0.1.4](https://github.com/nuxt-community/strapi-module/compare/v0.1.3...v0.1.4) (2020-08-18)

### [0.1.3](https://github.com/nuxt-community/strapi-module/compare/v0.1.2...v0.1.3) (2020-07-28)


### Bug Fixes

* avoid redefine property if exists ([4ac979c](https://github.com/nuxt-community/strapi-module/commit/4ac979c0dff1aac8d045e097ff6c7e1e4303ed4c))

### [0.1.2](https://github.com/nuxt-community/strapi-module/compare/v0.1.1...v0.1.2) (2020-07-16)


### Features

* use runtimeConfig to avoid building when changing Strapi URL ([4442467](https://github.com/nuxt-community/strapi-module/commit/4442467b294ee7352dccf3131682e20b0f89f706))


### Bug Fixes

* update test with new example ([404fdca](https://github.com/nuxt-community/strapi-module/commit/404fdca6f880c685d31c84a20838b5fd5e05b1e0))

### [0.1.1](https://github.com/nuxt-company/strapi-module/compare/v0.1.0...v0.1.1) (2020-07-08)


### Bug Fixes

* **lib:** use findOne to get users me ([50ca41c](https://github.com/nuxt-company/strapi-module/commit/50ca41c38bf6862a7ca7b6973032d1e9b3dcb271))

## [0.1.0](https://github.com/nuxt-community/strapi-module/compare/v0.0.1...v0.1.0) (2020-07-06)

### 0.0.1 (2020-06-24)


### Features

* **lib:** add sendEmailConfirmation method ([ec29cc4](https://github.com/nuxt-community/strapi-module/commit/ec29cc40e7b564ae0858fbc86f6b1ac4e856ef38))
* **lib:** handle entities ([d98a31f](https://github.com/nuxt-community/strapi-module/commit/d98a31f716cf42443759ad0af3a112578e3b7a8f))
* **lib:** handle ssr nuxt state ([f24ff2f](https://github.com/nuxt-community/strapi-module/commit/f24ff2fca2990c89ffa80267084a3f525bc8d0df))
* **lib:** rename methods ([cc4527e](https://github.com/nuxt-community/strapi-module/commit/cc4527ecc62abf559dfa707ee9a44236e4e4e631))
* **lib:** update ([12a0b97](https://github.com/nuxt-community/strapi-module/commit/12a0b972882cc073d763fd72cb3d90e40b521d3c))


### Bug Fixes

* **lib:** remove throw ([1378f81](https://github.com/nuxt-community/strapi-module/commit/1378f815d162b5205aff2f87f12be82c945bb260))
