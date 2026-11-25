import { assertType } from 'vitest'
import type { Strapi5RequestParams, Strapi5RequestPopulateParam } from '../../src/runtime/types/v5'

// Compile-time regression tests checked by pnpm run typecheck in CI.
interface Image {
  id: number
  url: string
  formats: {
    thumbnail: { url: string }
  }
}

interface Hero {
  id: number
  __component: 'sections.hero'
  heading: string
  image: Image
}

interface Gallery {
  id: number
  __component: 'sections.gallery'
  heading: string
  images: Image[]
}

interface Page {
  id: number
  documentId: string
  title: string
  sections: (Hero | Gallery)[]
  author: {
    name: string
    avatar: Image
  }
}

// The dynamic-zone query from issue #505 must compile without casts.
assertType<Strapi5RequestParams<Page>>({
  populate: {
    sections: {
      on: {
        'sections.hero': { populate: ['image'] },
        'sections.gallery': { populate: ['images'] }
      }
    }
  },
  pagination: { page: 1, pageSize: 1 }
})

// Fragments can select a subset of components and use nested query options.
assertType<Strapi5RequestParams<Page>>({
  populate: {
    sections: {
      on: {
        'sections.hero': {
          fields: ['heading'],
          sort: ['heading:asc'],
          filters: { heading: { $contains: 'Welcome' } },
          populate: {
            image: { fields: ['url'], populate: ['formats.thumbnail'] }
          }
        }
      }
    }
  }
})

assertType<Strapi5RequestParams<Page>>({
  populate: { sections: { on: { 'sections.gallery': { populate: '*' } } } }
})

// Fragment inference also works for a single component and nested relations.
assertType<Strapi5RequestParams<{ sections: Hero[] }>>({
  populate: { sections: { on: { 'sections.hero': { populate: ['image'] } } } }
})

assertType<Strapi5RequestParams<{ page: Page }>>({
  populate: {
    page: {
      populate: { sections: { on: { 'sections.hero': { populate: ['image'] } } } }
    }
  }
})

// Existing populate forms remain valid.
assertType<Strapi5RequestPopulateParam<Page>>('*')
assertType<Strapi5RequestPopulateParam<Page>>('author.avatar')
assertType<Strapi5RequestPopulateParam<Page>>(['sections', 'author.avatar'])
assertType<Strapi5RequestPopulateParam<Page>>({ sections: '*' })
assertType<Strapi5RequestPopulateParam<Page>>({ author: { avatar: '*' } })
assertType<Strapi5RequestPopulateParam<Page>>({ author: { populate: ['avatar'], fields: ['name'] } })

// Component names and their fragment fields must match the discriminated union.
assertType<Strapi5RequestParams<Page>>({
  populate: {
    sections: {
      on: {
        'sections.hero': { populate: ['image'] },
        // @ts-expect-error This component is not part of the dynamic zone.
        'sections.unknown': { populate: '*' }
      }
    }
  }
})

assertType<Strapi5RequestParams<Page>>({
  // @ts-expect-error The images relation belongs to the gallery component.
  populate: {
    sections: {
      on: {
        'sections.hero': { populate: ['images'] }
      }
    }
  }
})

assertType<Strapi5RequestParams<Page>>({
  // @ts-expect-error Fragment fields must exist on the selected component.
  populate: {
    sections: {
      on: {
        'sections.gallery': { fields: ['missing'] }
      }
    }
  }
})

assertType<Strapi5RequestParams<Page>>({
  populate: {
    author: {
      // @ts-expect-error Ordinary relations do not have component fragments.
      on: { 'sections.hero': { populate: ['image'] } }
    }
  }
})
