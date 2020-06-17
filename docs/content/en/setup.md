---
title: Setup
description: ''
position: 1
category: Guide
categoryPosition: 2
---

Check the [Nuxt.js documentation](https://nuxtjs.org/api/configuration-modules#the-modules-property) for more information about installing and using modules in Nuxt.js.

## Installation

Add `@nuxtjs/strapi` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxtjs/strapi
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxtjs/strapi
  ```

  </code-block>
</code-group>

## Configure

Then, add `@nuxtjs/strapi` to the `modules` section of `nuxt.config.js`:

```js[nuxt.config.js]
{
  modules: [
    '@nuxtjs/strapi'
  ],
  content: {
    // Options
  }
}
```

See [module options](/options).
