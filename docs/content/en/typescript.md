---
title: Usage with Typescript
description: 'Discover how you can setup your project to integrate Strapi with TypeScript'
position: 7
category: Advanced
---

## Setup

Thanks to [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html),
you can tell the TypeScript compiler where to find the `$strapi` types by adding these lines to your 
`tsconfig.json`.

```json[tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "@nuxtjs/strapi"
    ]
  }
}
```

## Usage

You now have access to `this.$strapi` inside your components and to `ctx.$strapi` inside 
`asyncData`, `fetch`, `plugins`, `middlewares` and `nuxtServerInit`.

### In component methods
```vue
<script lang="ts">
import Vue from 'vue'

interface BlogPost {
  title: string;
  description: string;
}

export default Vue.extend({
  async data () {
    const post = await this.$strapi.create<BlogPost>(
      'posts',
      {
        title: 'Welcome to Strapi',
        description: 'Strapi is awesome!'
      }
    )

    return {
      post
    }
  }
})
</script>
```

> Notice how you can define the type of the query parameters and of the returned value using generics.

### Inside methods that use `context`
```vue
<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

interface BlogPost {
  title: string;
  description: string;
}

export default Vue.extend({
  async asyncData (ctx: Context) {
    const posts = await ctx.$strapi.find<BlogPost[]>(
      'posts'
    )

    return {
      posts
    }
  }
})
</script>
```

## Known issues

There are some known issues with the current implementation of TypeScript in the library,
so we have listed some workarounds.

### Entity shortcuts

The current TypeScript implementation doesn't support entity shortcuts: your code may work,
but it will throw type checking errors. This is why we made the `entity` parameter needed in
every method which involves a query.

You can however define the entities available to your Vue methods with
[string literal types](https://www.typescriptlang.org/docs/handbook/literal-types.html#string-literal-types)
as described below.

```vue
<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

interface BlogPost {
  title: string;
  description: string;
}

type Entities = 'posts' | 'projects'

export default Vue.extend({
  async asyncData (ctx: Context) {
    const posts = await ctx.$strapi.find<BlogPost[], Entities>(
      'posts'
    )

    return {
      posts
    }
  }
})
</script>
```

### Query params

Some query methods won't be accepted by the compiler if you define generics as in `$strapi.find<BlogPost[]>`
(e.g.: the array methods described [here](https://strapi.nuxtjs.org/strapi#findentity-params)).

You can get around this issue by doing something like below.

```vue
<script lang="ts">
import Vue from 'vue'

interface BlogPost {
  title: string;
  description: string;
}

export default Vue.extend({
  async asyncData (ctx: Context) {
    const posts: BlogPost[] = await this.$strapi.find(
      'posts'
    )

    return {
      posts
    }
  }
})
</script>
```

> You can always declare the return type by assigning a type to the variable instead of the method.
