import theme from '@nuxt/content-theme-docs'

export default theme({
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  loading: { color: '#846fee' },
  generate: {
    fallback: '404.html', // for Netlify
    routes: ['/'] // give the first url to start crawling
  }
})
