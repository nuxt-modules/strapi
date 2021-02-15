import { withDocus } from 'docus'

export default withDocus({
  buildModules: [
    'vue-plausible'
  ],
  docus: {
    colors: {
      primary: '#8E75FF',
      code: '#06B6D4'
    }
  },
  plausible: {
    domain: 'strapi.nuxtjs.org'
  }
})
