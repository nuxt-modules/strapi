<template>
  <div>
    <h1>@nuxtjs/strapi</h1>
    <h2>User</h2>
    <pre>{{ user }}</pre>
    <h2>Url</h2>
    <pre>{{ url }}</pre>
    <h2>Version</h2>
    <pre>{{ version }}</pre>
  </div>
</template>

<script lang="ts" setup>
const user = useStrapiUser()
const url = useStrapiUrl()
const version = useStrapiVersion()
</script>
