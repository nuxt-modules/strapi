---
title: Setup
description: 'Learn how to setup Strapi in your Nuxt app'
position: 2
category: Getting Started
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

```ts [nuxt.config.js]
export default {
  modules: ['@nuxtjs/strapi'],
  strapi: {
    // Options
  }
}
```

See [module options](/options).
