import { withDocus } from 'docus'

export default withDocus({
  rootDir: __dirname,
  buildModules: [
    'vue-plausible'
  ],
  plausible: {
    domain: 'strapi.nuxtjs.org'
  }
})
