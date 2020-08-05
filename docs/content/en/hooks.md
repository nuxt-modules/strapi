---
title: Hooks
description: ''
position: 4
category: Guide
---

The module adds some hooks you can use.

### `error`

You can register an `error` hook to display a toast for example:

```js{}[plugins/strapi.js]
export default ({ $strapi, app }) => {
  $strapi.hook('error', (e) => {
    app.$toast.error(e.message)
  })
}
```