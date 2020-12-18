---
title: Options
description: 'Discover the options of the Strapi module for Nuxt'
position: 6
category: API
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

Entities can also be defined as objects to specify the content type.

- `name`
  - Type: `String`
- `type`
  - Type: `String`
  - Default: `collection`
  - Values: `'collection' || 'single'`

**Example**

```js{}[nuxt.config.js]
export default {
  strapi: {
    entities: [
      { name: 'homepage', type: 'single' }
    ]
  }
}
```

> Check out the [Strapi documentation](https://strapi.io/documentation/v3.x/content-api/api-endpoints.html#endpoints) on API endpoints.

See more in [Usage](/usage#entities).
