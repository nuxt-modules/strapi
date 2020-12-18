---
title: Using a proxy
description: 'Use Strapi behind a proxy with Nuxt Proxy module'
position: 7
category: Advanced
fullscreen: true
---

You can use the [@nuxtjs/proxy](https://github.com/nuxt-community/proxy-module) module if you want to proxy your Strapi URL:

```js [nuxt.config.js]
export default {
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api/strapi': {
      target: 'http://localhost:1337',
      pathRewrite: {
        '^/api/strapi': '/'
      }
    }
  },
  strapi: {
    url: '/api/strapi'
  }
}
```
