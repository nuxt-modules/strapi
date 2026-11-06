import { assertType } from 'vitest'
import type { StrapiFilterRequestParam, Strapi5RequestParams } from '../../src/runtime/types'
import type { Strapi4FilterRequestParam, Strapi4RequestParams, Strapi4Response, Strapi4ResponseMany, Strapi4ResponseSingle } from '../../src/runtime/types/v4'

// Compile-time regression tests checked by pnpm run typecheck in CI.
interface Page {
  slug: string
  views: number
  published: boolean
  parent?: Strapi4ResponseSingle<Page> | null
  localizations?: Strapi4ResponseMany<Page> | null
  related: Strapi4Response<Page>
  tags: string[]
  settings: {
    data: { attributes: { value: string } }
    attributes: { enabled: boolean }
    meta: string
  }
}

// Relation filters use attributes directly, as in issue #494.
assertType<Strapi4RequestParams<Page>>({
  filters: {
    parent: { slug: { $null: true } },
    localizations: { slug: { $eq: 'home' } }
  }
})

// Generic response wrappers expose both attributes and the numeric relation id.
assertType<Strapi4RequestParams<Page>>({
  filters: { related: { slug: { $eq: 'home' }, id: { $in: [1, 2] } } }
})

// Required relations work as well as the optional and nullable ones above.
interface RequiredRelations {
  parent: Strapi4ResponseSingle<Page>
  localizations: Strapi4ResponseMany<Page>
}

assertType<Strapi4RequestParams<RequiredRelations>>({
  filters: {
    parent: { id: { $eq: 1 }, slug: { $contains: 'home' } },
    localizations: { id: { $gt: 1 }, views: { $between: [10, 20] } }
  }
})

// Recursive relations can be filtered through multiple levels.
assertType<Strapi4RequestParams<Page>>({
  filters: {
    parent: {
      localizations: {
        parent: { slug: { $startsWith: 'home' } }
      }
    }
  }
})

// Existing populate query options inherit the relation-aware filter type.
type PopulatedPage = { slug: string, parent: Strapi4ResponseSingle<{ slug: string }> }
assertType<Strapi4RequestParams<{
  parent: Strapi4ResponseSingle<PopulatedPage>
  localizations: Strapi4ResponseMany<PopulatedPage>
}>>({
  populate: {
    parent: { filters: { slug: { $eq: 'home' } } },
    localizations: { filters: { parent: { slug: { $eq: 'home' } } } }
  }
})

// Ordinary objects retain fields named data and attributes.
assertType<Strapi4RequestParams<Page>>({
  filters: {
    slug: { $contains: 'home' },
    views: { $gt: 0 },
    published: { $eq: true },
    settings: {
      data: { attributes: { value: { $eq: 'home' } } },
      attributes: { enabled: { $eq: true } },
      meta: { $eq: 'custom' }
    }
  }
})

// Preserve filter shapes already accepted by the shared filter type.
const existingFilters: StrapiFilterRequestParam<Page> = {
  parent: { data: { attributes: { slug: { $eq: 'home' } } } },
  tags: [{ $eq: 'home' }]
}
assertType<Strapi4RequestParams<Page>>({ filters: existingFilters })
const preserveExistingFilters = <T>(filters: StrapiFilterRequestParam<T>): Strapi4FilterRequestParam<T> => filters
assertType<Strapi4FilterRequestParam<Page>>(preserveExistingFilters(existingFilters))
assertType<Strapi4FilterRequestParam<Page>>({ parent: { slug: { $eq: 'home' } } })

// String and number operators must retain their operand types.
// @ts-expect-error The relation has no missing attribute.
assertType<Strapi4RequestParams<Page>>({ filters: { parent: { missing: { $eq: 'home' } } } })
// @ts-expect-error String operators do not accept numbers.
assertType<Strapi4RequestParams<Page>>({ filters: { localizations: { slug: { $contains: 42 } } } })
// @ts-expect-error Relation ids are numeric.
assertType<Strapi4RequestParams<Page>>({ filters: { related: { id: { $eq: 'home' } } } })
// @ts-expect-error Numeric relation attributes do not accept strings.
assertType<Strapi4RequestParams<Page>>({ filters: { parent: { views: { $gt: 'home' } } } })
// @ts-expect-error Ordinary JSON objects are not unwrapped as response envelopes.
assertType<Strapi4RequestParams<Page>>({ filters: { settings: { value: { $eq: 'home' } } } })

// V5 continues to use the shared filter type without V4 wrapper unwrapping.
assertType<Strapi5RequestParams<{ parent: { slug: string } }>>({
  filters: { parent: { slug: { $eq: 'home' } } }
})
// @ts-expect-error A V4 response wrapper is not unwrapped by V5 filters.
assertType<Strapi5RequestParams<Page>>({ filters: { parent: { slug: { $eq: 'home' } } } })
