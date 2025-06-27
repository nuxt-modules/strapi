export default defineAppConfig({
  header: {
    title: 'Nuxt Strapi'
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate'
    }
  },
  socials: {
    discord: 'https://discord.com/invite/ps2h6QT',
    x: 'https://x.com/nuxt_js'
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      links: [
        {
          icon: 'i-simple-icons-nuxtdotjs',
          label: 'Nuxt docs',
          to: 'https://nuxt.com',
          target: '_blank'
        },
        {
          icon: 'i-simple-icons-strapi',
          label: 'Strapi docs',
          to: 'https://docs.strapi.io/dev-docs/intro',
          target: '_blank'
        }
      ]
    }
  }
})
