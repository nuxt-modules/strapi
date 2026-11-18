<script setup lang="ts">
import { useStrapiMedia, useStrapiUrl } from '#imports'

const mediaUrls = [
  '/uploads/image.jpg',
  'uploads/no-leading-slash.jpg',
  'https://cdn.example.com/image.jpg',
  'http://cdn.example.com/image.jpg'
].map(path => useStrapiMedia(path))
const apiUrl = useStrapiUrl()
</script>

<template>
  <div>
    <img
      v-for="url in mediaUrls"
      :key="url"
      :src="url"
      alt="Strapi media"
    >
    <p id="api-url">
      {{ apiUrl }}
    </p>
  </div>
</template>
