import { defineThemeConfig } from 'docus'

export default defineThemeConfig({
  colors: {
    primary: '#8E75FF',
    prism: {
      background: '#F4F4F5 dark:#1F2937'
    }
  },
  template: 'docs',
  header: {
    title: false,
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg'
    }
  }
})
