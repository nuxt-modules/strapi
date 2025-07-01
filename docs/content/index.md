---
prose: true
seo:
  title: Strapi integration for Nuxt
  description: Nuxt module for first class integration with the Strapi CMS.
  ogImage: https://strapi.nuxtjs.org/cover.png
---

::u-page-hero{orientation="horizontal"}
---
links:
  - label: Get started
    to: /setup
    trailingIcon: i-lucide-arrow-right
  - label: Star on GitHub
    to: https://github.com/nuxt-modules/strapi
    target: _blank
    icon: i-simple-icons-github
    color: neutral
    variant: subtle
---

#title
Nuxt [Strapi]{.text-primary}

#description
Nuxt module for first class integration with the Strapi CMS.

#default
  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    modules: ['@nuxtjs/strapi'],
    strapi: {
      version: 'v5',
      prefix: '/api'
    }
  })
  ```
::

::u-page-section
#title
Shipped with many features.

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-nuxtdotjs
  ---
  #title{unwrap="p"}
  Nuxt 3 Ready
  #description{unwrap="p"}
  Leverage our auto-imported [composables](/usage) and our [devtools](/devtools) integration.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-strapi
  ---
  #title{unwrap="p"}
  Strapi v4/v3/v5
  #description{unwrap="p"}
  Works with the different versions of Strapi.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-lock
  ---
  #title{unwrap="p"}
  Authentication
  #description{unwrap="p"}
  Leverage [`useStrapiUser`](/auth) composable to bring auth to your app.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server-cog
  ---
  #title{unwrap="p"}
  RESTful
  #description{unwrap="p"}
  Interact with all the HTTP methods to your Strapi API.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bug
  ---
  #title{unwrap="p"}
  Error Handling
  #description{unwrap="p"}
  Handle errors with our [hooks](/advanced#errors-handling) to provide a great UX.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-typescript
  ---
  #title{unwrap="p"}
  TypeScript Support
  #description{unwrap="p"}
  Our composables support types augmentation.
  :::
::
