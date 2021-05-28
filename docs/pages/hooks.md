---
title: Hooks
description: Add hooks on Strapi HTTP calls
position: 4
category: Guide
---

The module adds some hooks you can use.

### `error`

You can register an `error` hook to display a toast for example:

```ts [plugins/strapi.js]
export default ({ $strapi, app }) => {
  $strapi.hook('error', (error) => {
    app.$toast.error(error.message)
  })
}
```

You can also get the original error from Strapi api with `error.original`.

### `userUpdated`

You can register an `userUpdated` hook to force refetch inside components:


```html [components/navbar.vue]
<template>
  <div>
    <p v-for="(userInvoice, index) in userInvoices" key="index">
      {{ index }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unregisterUserHook: null,
      userInvoices: []
    }
  },
  async fetch() {
    // get user related data
  },
  mounted() {
    this.unregisterUserHook = this.$strapi.hook('userUpdated', (user) => {
      this.$fetch()
    })
  },
  beforeDestroy() {
    if (this.unregisterUserHook) {
      this.unregisterUserHook()
    }
  },
}
</script>
```
