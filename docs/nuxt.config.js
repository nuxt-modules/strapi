import { withDocus } from 'docus'

export default withDocus({
  buildModules: [
    // https://github.com/bdrtsky/nuxt-ackee
    'nuxt-ackee'
  ],
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  docus: {
    colors: {
      primary: '#8E75FF',
      code: '#06B6D4'
    }
  },
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: '4370defe-04f9-4987-82d7-817b4de6b253',
    detailed: true
  }
})
