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
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com'
      },
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          component: 'IconNuxt'
        }
      ]
    }
  }
})
