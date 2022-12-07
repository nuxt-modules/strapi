export default defineAppConfig({
  docus: {
    title: 'Nuxt Strapi',
    layout: 'default',
    url: 'https://strapi.nuxtjs.org',
    description: '@nuxtjs/strapi is a Nuxt module for first class integration with Strapi.',
    socials: {
      github: 'nuxt-modules/strapi',
      twitter: 'nuxt_js'
    },
    image: '/cover.jpg',
    header: {
      logo: true
    },
    footer: {
      iconLinks: [
        {
          label: 'Nuxt',
          href: 'https://nuxt.com',
          icon: 'simple-icons:nuxtdotjs'
        },
        {
          label: 'Strapi',
          href: 'https://strapi.io',
          icon: 'simple-icons:strapi'
        }
      ]
    }
  }
})
