---
title: Usage
description: 'Learn how to use the Strapi module in your Nuxt app'
position: 3
category: Guide
---

## Authentication

To handle authentication in your Nuxt app with Strapi, you can:

### Login

```js
await this.$strapi.login({ identifier: '', password: '' })
```

### Register

```js
await this.$strapi.register({ email: '', username: '', password: '' })
```

### Logout

```js
await this.$strapi.logout()
```

### Forgot password

```js
await this.$strapi.forgotPassword({ email: '' })
```

### Reset password

```js
await this.$strapi.resetPassword({ code: this.$route.query.code, password: '', passwordConfirmation: '' })
```

### User

Once logged in, you can access your `user` everywhere:

```vue{}[components/navbar.vue]
<template>
  <div>
    <p v-if="$strapi.user">
      Logged in
    </p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    user () {
      return this.$strapi.user
    }
  },
  methods: {
    logout () {
      this.$strapi.logout()
      this.$router.push('/')
    }
  }
}
</script>
```

```js{}[middleware/auth.js]
export default function ({ redirect, $strapi }) {
  if (!$strapi.user) {
    return redirect('/login')
  }
}
```

> You can check all the [methods available](/strapi#methods)

## Entities

You can access the default Strapi CRUD operations by using these methods:

- `find`
- `count`
- `findOne`
- `create`
- `update`
- `delete`

```js
await this.$strapi.find('products')
```

> See more in [$strapi methods](/strapi#methods)

You can also define your Strapi entities to add shortcuts to the previous methods, see [options](/options#entities).

```js
await this.$strapi.$products.find()
```

## Advanced

### Accessing $http

If you defined custom routes in your Strapi API that goes out of the REST scope, this module exposes `$http`:

```js
this.results = await this.$strapi.$http.$get('/products/search', { searchParams: { _q: 't-shirt' } })
```

### Updating current user

<alert type="info">

You often need to update your user, and so on define a custom route in Strapi: `PUT /users/me`.

</alert>

You can use this module to call it this way:

```js
const user = await this.$strapi.$users.update('me', form)
```

And then mutate the `user`:

```js
this.$strapi.user = user
```
