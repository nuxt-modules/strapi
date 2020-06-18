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

This object contains details about authenticated user. You can access it using `$strapi`.

```js
// get user
this.$strapi.user
// set user prop
this.$strapi.user.avatar = ''
```

## Methods

### `register(form)`

- Returns `Promise`

Register using local strategy. Sets the [User](#setuseruser) and [Token](#settokentoken).

> See the [Strapi documentation](https://strapi.io/documentation/v3.x/plugins/users-permissions.html#registration).

```js
await this.$strapi.register({ username: '', email: '', password: '' })
```

### `login(form)`

- Returns `Promise`

Login using local strategy. Sets the [User](#setuseruser) and [Token](#settokentoken).

> See the [Strapi documentation](https://strapi.io/documentation/v3.x/plugins/users-permissions.html#login).

```js
await this.$strapi.login({ identifier: '', password: '' })
```

### `forgotPassword(form)`

- Returns `Promise`

> See the [Strapi documentation](https://strapi.io/documentation/v3.x/plugins/users-permissions.html#forgotten-password).

```js
await this.$strapi.forgotPassword({ email: '' })
```

### `resetPassword(form)`

- Returns `Promise`

Reset password. Sets the [User](#setuseruser) and [Token](#settokentoken).

> See the [Strapi documentation](https://strapi.io/documentation/v3.x/plugins/users-permissions.html#reset-password).

```js
await this.$strapi.resetPassword({ code: '', password: '', passwordConfirmation: '' })
```

### `sendEmailConfirmation(form)`

- Returns `Promise`

See the [Strapi documentation](https://strapi.io/documentation/v3.x/plugins/users-permissions.html#email-validation).

```js
await this.$strapi.sendEmailConfirmation({ email: '' })
```

### `logout()`

Clears the `user` and `jwt` in cookies.

```js
this.$strapi.logout()
```

### `fetchUser()`

- Returns `Promise`

Fetch `me` user from `/users/me` route if a `jwt` is present in the cookies. Sets the `jwt` inside `$http`. Sets the [User](#setuseruser).

> This method is called by default on init, so you don't have to.

<base-alert type="info">

On `ssr` mode, this method is called on the server-side only and the data are hydrated client-side so the HTTP call happens only once.

</base-alert>

### `setUser(user)`

Set user data.

> You can use the `$strapi.user` property to mutate the object instead of overriding the `user`.

```js
this.$auth.setUser(user)
```

### `getToken()`

Returns `jwt` from cookies.

### `setToken(token)`

Sets token inside `$http` as a [jwt](https://jwt.io/) `Bearer`.

Store `jwt` in `cookies`.

### `clearToken()`

Remove `jwt` from `$http` and `$cookies`.

### `getEntries`

### `getEntryCount`

### `getEntry`

### `createEntry`

### `updateEntry`

### `deleteEntry`

### `$entity.find()`

### `$entity.findOne()`

### `$entity.count()`

### `$entity.create()`

### `$entity.update()`

### `$entity.delete()`

## Extends

### `$http`

This module uses [@nuxt/http](https://github.com/nuxt/http) under the hood, you can access it directly from there:

```js
await this.$strapi.$http.$get(/* .... */)
```

### `$cookies`

This module uses [cookie-universal-nuxt](https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt) under the hood, you can access it directly from there:

```js
this.$strapi.$cookies.set('key', 'value')
```
