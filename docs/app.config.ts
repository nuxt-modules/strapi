export default defineAppConfig({
  docus: {
    title: 'Nuxt Strapi',
    description: '@nuxtjs/strapi is a Nuxt module for first class integration with Strapi.',
    image: '/cover.jpg',
    socials: {
      twitter: 'nuxt_js',
      github: 'nuxt-modules/strapi'
    },
    aside: {
      level: 1
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: []
    },
    footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'IconNuxtLabs'
        }
      ]
    }
  }
})
