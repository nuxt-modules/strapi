<script setup lang="ts">
import { joinURL } from 'ufo'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const { url } = useSiteConfig()

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: joinURL(url, '/cover.png'),
  twitterImage: joinURL(url, '/cover.png')
})
</script>

<template>
  <div>
    <ULandingHero
      v-if="page.hero"
      v-bind="page.hero"
    >
      <template #title>
        <MDC :value="page.hero.title" />
      </template>

      <MDC
        :value="page.hero.code"
        tag="pre"
        class="prose prose-primary dark:prose-invert max-w-none"
      />
    </ULandingHero>

    <ULandingSection :title="page.features.title">
      <UPageGrid>
        <ULandingCard
          v-for="(item, index) of page.features.items"
          :key="index"
          :icon="item.icon"
          :title="item.title"
        >
          <MDC
            :value="item.description"
            class="prose prose-primary dark:prose-invert max-w-none"
          />
        </ULandingCard>
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
