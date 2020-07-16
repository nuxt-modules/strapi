<template>
  <div>
    <h1>@nuxtjs/strapi</h1>
    <h2>$strapi.state</h2>
    <pre>{{ JSON.stringify($strapi.state) }}</pre>
    <h2>options.url</h2>
    <pre>{{ $strapi.$http._defaults.prefixUrl }}</pre>
  </div>
</template>

<style scoped>
div {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
