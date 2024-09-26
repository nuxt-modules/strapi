export default defineAppConfig({
  ui: {
    primary: 'strapi',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  header: {
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/nuxt-modules/strapi',
      'target': '_blank',
      'aria-label': '@nuxtjs/strapi on GitHub'
    }]
  },
  footer: {
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/invite/ps2h6QT',
      'target': '_blank',
      'aria-label': 'Nuxt UI on Discord'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/nuxt_js',
      'target': '_blank',
      'aria-label': 'Nuxt on X'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/nuxt-modules/strapi',
      'target': '_blank',
      'aria-label': '@nuxtjs/strapi on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/nuxt-modules/strapi/edit/dev/docs/content',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/nuxt-modules/strapi',
        target: '_blank'
      }, {
        icon: 'i-simple-icons-nuxtdotjs',
        label: 'Nuxt docs',
        to: 'https://nuxt.com/docs/getting-started/introduction',
        target: '_blank'
      }, {
        icon: 'i-simple-icons-strapi',
        label: 'Strapi docs',
        to: 'https://docs.strapi.io/dev-docs/intro',
        target: '_blank'
      }]
    }
  }
})
