export default defineAppConfig({
  docus: {
    title: 'Nuxt Strapi',
    layout: {
      fluid: true
    },
    url: 'https://strapi.nuxtjs.org',
    description: '@nuxtjs/strapi is a Nuxt module for first class integration with Strapi.',
    socials: {
      github: 'nuxt-modules/strapi',
      twitter: 'nuxt_js'
    },
    image: '/cover.png',
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
