import theme from '@nuxt/content-theme-docs'

export default theme({
  buildModules: [
    // https://github.com/bdrtsky/nuxt-ackee
    'nuxt-ackee'
  ],
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  loading: { color: '#8E75FF' },
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: '4370defe-04f9-4987-82d7-817b4de6b253',
    detailed: true
  }
})
