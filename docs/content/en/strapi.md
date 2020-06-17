---
title: $strapi
description: ''
position: 1
category: API
categoryPosition: 3
---

This module globally injects `$strapi` instance, meaning that you can access it anywhere using `this.$strapi`. For plugins, asyncData, fetch, nuxtServerInit and Middleware, you can access it from `context.$strapi`.

## Properties

All properties are reactive. Meaning that you can safely use them in Vue template `v-if` conditions.

### `user`

## Methods