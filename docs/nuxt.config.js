import theme from '@nuxt/content-theme-docs'

const script = []
if (process.env.NODE_ENV === 'production') {
  script.push({
    hid: 'umami',
    src: 'https://analytics.nuxtjs.app/umami.js',
    'data-website-id': '597c348a-381d-4856-872e-02af59be8f2e',
    defer: true,
    async: true
  })
}

export default theme({
  head: {
    script
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  loading: { color: '#8E75FF' }
})
