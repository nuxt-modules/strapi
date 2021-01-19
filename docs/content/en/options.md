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

## `key`

<badge>v0.2.0+</badge>

- Type: `String`
- Default: `'strapi_jwt'`

Key used for the cookie name as well as localStorage/sessionStorage key.

```js{}[nuxt.config.js]
export default {
  strapi: {
    key: 'userJwt'
  }
}
```
## `expires`

<badge>v0.2.0+</badge>

- Type: `String` or `Number` or `'session'`
- Default: `'session'`

When `expires === 'session'`, the [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) will be used to act like the cookie.

Otherwise, if the value is a string, it will be parsed using [ms](https://github.com/vercel/ms), ex: expires: '7d'

A number can also be provided as milliseconds, ex: expires: 7 * 24 * 3600 * 1000

```js{}[nuxt.config.js]
export default {
  strapi: {
    expires: '31d'
  }
}
```

### `cookie`

<badge>v0.2.0+</badge>

- Type: `Object`
- Default: `{}`

Options to forward to the [cookie#options](https://github.com/jshttp/cookie#options-1) module, the `expires` property will be overwritten.

```js{}[nuxt.config.js]
export default {
  strapi: {
    cookie: {
      sameSite: 'lax'
    }
  }
}
```
