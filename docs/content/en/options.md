---
title: options
description: ''
position: 2
category: API
categoryPosition: 3
---

## `url`

- Default: `process.env.STRAPI_URL || http://localhost:1337`

URL of the Strapi server.

Environment variable `STRAPI_URL` can be used to override `url`.

## `entities`

- Default: `[]`

You can specify the entities present in your API. Doing so will define the entities as properties in `$strapi` so you can access it:

```js{}[nuxt.config.js]
export default {
  strapi: {
    entities: ['products']
  }
}
```

```js
await this.$strapi.$products.find()
```

See more in [Usage](/usage#entities).
