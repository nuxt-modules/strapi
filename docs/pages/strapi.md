---
title: $strapi
description: 'Use the $strapi inside your Nuxt app'
position: 5
category: API
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

### `find(entity, params?)`

- Returns `Promise`

Get entries. Returns entries matching the query filters. You can read more about parameters [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters).

The second argument `params` is for query parameters:

```js
await this.$strapi.find('products', { title: '' })
// With entity shortcut
await this.$strapi.$products.find({ title: '' })
```
<alert type="info">
You can also pass an array in two ways:
</alert>

<code-group>
  <code-block label="Syntax" active>

```js
// 1st method
await $strapi.find('products', [['categories.name', 'women'], ['categories.name', 'men']])
// With entity shortcut
await $strapi.$products.find([['categories.name', 'women'], ['categories.name', 'men']])
// Entity shortcut with additional API Parameters
await $strapi.$products.find([['categories.name', 'women'], ['categories.name', 'men'], ['_limit', '200']])

// 2nd method
await $strapi.find('products', { 'categories.name': ['women', 'men'] })
// With entity shortcut
await $strapi.$products.find({ 'categories.name': ['women', 'men'] })
// Entity shortcut with additional API Parameters
await $strapi.$products.find({ 'categories.name': ['women', 'men'], _limit: 200 })
```

  </code-block>
  <code-block label="Output">

```js
// 1st method
"?categories.name=woman&categories.name=men"
// 2nd method
"?categories.name=women%2Cmen"
```

  </code-block>
</code-group>

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `count(entity, params?)`

- Returns `Promise`

Count entries. Returns the count of entries matching the query filters. You can read more about parameters [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters).

```js
await this.$strapi.count('products', params)
// With entity shortcut
await this.$strapi.$products.count(params)
```

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `findOne(entity, id, params?)`

- Returns `Promise`

Get an entry. Returns an entry by id.

```js
await this.$strapi.findOne('products', 1)
// With entity shortcut
await this.$strapi.$products.findOne(1)
```

Like the `find` method, you can pass optional query params as a third argument:

```js
await this.$strapi.findOne('products', 1, { _publicationState: 'preview' })
```

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `create(entity, data)`

- Returns `Promise`

Creates an entry and returns its value.

```js
await this.$strapi.create('products', { title: '' })
// With entity shortcut
await this.$strapi.$products.create({ title: '' })
```

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `update(entity, id, data)`

- Returns `Promise`

Partially updates an entry by id and returns its value. Fields that aren't sent in the query are not changed in the db. Send a null value if you want to clear them.

```js
await this.$strapi.update('products', 1, { title: '' })
// With entity shortcut
await this.$strapi.$products.update(1, { title: '' })
```

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `delete(entity, id)`

- Returns `Promise`

Deletes an entry by id and returns its value.

```js
await this.$strapi.delete('products', 1)
// With entity shortcut
await this.$strapi.$products.delete(1)
```

> See the [Strapi endpoints](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints).

### `graphql(data)`

- Returns `Promise`

Performs an HTTP request to GraphQL API and returns its value

<code-group>
  <code-block label="Directly in methods" active>

  ```js
  const restaurantId = 4;

  await strapi.graphql({
    query: `query {
      restaurant(id: ${restaurantId}) {
        name
        phone
        owners {
          first
          last
        }
      }
    }`
  });
  ```

  </code-block>
  <code-block label="With graphql-tag">

  ```js{}[restaurants.js]
  import gql from "graphql-tag";

  export function getRestaurant() {
    const query = gql`
      query getRestaurant($id: Int!) {
        restaurant(id: $id) {
          name
          phone
          owners {
            first
            last
          }
        }
      }`;
    return query.loc.source.body;
  }
  ```

  ```js
  import { getRestaurant } from 'restaurants.js'

  const restaurantId = 4;

  await this.$strapi.graphql({
    query: getRestaurant(),
    variables: {
      id: restaurantId
    }
  })
  ```


  </code-block>
</code-group>

### `register(form)`

- Returns `Promise`

Register using local strategy. Sets the [User](#setuseruser) and [Token](#settokentoken).

```js
await this.$strapi.register({ username: '', email: '', password: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#registration).

### `login(form)`

- Returns `Promise`

Login using local strategy. Sets the [User](#setuseruser) and [Token](#settokentoken).

```js
await this.$strapi.login({ identifier: '', password: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login).

### `forgotPassword(form)`

- Returns `Promise`

```js
await this.$strapi.forgotPassword({ email: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password).

### `resetPassword(form)`

- Returns `Promise`

Reset password. Sets the [User](#setuseruser) and [Token](#settokentoken).

```js
await this.$strapi.resetPassword({ code: '', password: '', passwordConfirmation: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password).

### `sendEmailConfirmation(form)`

- Returns `Promise`

```js
await this.$strapi.sendEmailConfirmation({ email: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#email-validation).

### `logout()`

Clears the `user` and `jwt` in cookies.

```js
this.$strapi.logout()
```

### `fetchUser()`

- Returns `Promise`

Fetch `me` user from `/users/me` route if a `jwt` is present in the cookies. Sets the `jwt` inside `$http`. Sets the [User](#setuseruser).

> This method is called by default on init, so you don't have to.

<alert type="info">

On `ssr` mode, this method is called on the server-side only and the data are hydrated client-side so the HTTP call happens only once.

</alert>

### `setUser(user)`

Set user data.

```js
this.$strapi.setUser(user)
```

> You can use the `$strapi.user` property to mutate the object instead of overriding the `user`.

### `getToken()`

Returns `jwt` from cookies.

```js
this.$strapi.getToken()
```

### `setToken(token)`

Sets token inside `$http` as a [jwt](https://jwt.io/) `Bearer`.

Store `jwt` in `cookies`.

```js
this.$strapi.setToken(token)
```

### `clearToken()`

Remove `jwt` from `$http` and `$cookies`.

```js
this.$strapi.clearToken()
```

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
