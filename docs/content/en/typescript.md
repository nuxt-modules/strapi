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

<alert type="info">
Entity shortcuts will not be correctly picked up by the Typescript compiler,
we suggest not to use them if you're using Typescript.
</alert>
