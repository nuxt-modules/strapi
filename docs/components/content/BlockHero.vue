<script setup lang="ts">
defineProps({
  cta: {
    type: Array,
    default: () => ['Get started', '/get-started']
  },
  secondary: {
    type: Array,
    default: () => ['Open on GitHub', 'https://github.com']
  },
  snippet: {
    type: [String],
    default: () => ''
  }
})
</script>

<template>
  <section class="py-20 sm:py-24 lg:py-32">
    <Container padded class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <p v-if="$slots.link" class="mb-2">
          <Markdown :use="$slots.link" unwrap="p" />
        </p>

        <h1 class="text-center text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight lg:text-left">
          <Markdown :use="$slots.title" unwrap="p" />
        </h1>

        <p class="mt-4 text-lg text-gray-600 text-center max-w-3xl dark:text-gray-300 lg:text-left">
          <Markdown :use="$slots.description" unwrap="p" />
        </p>

        <div v-if="$slots.features" class="mt-6">
          <Markdown :use="$slots.features" unwrap="p" />
        </div>

        <div class="mt-6 sm:mt-10 flex flex-col items-center sm:flex-row gap-4 sm:gap-6">
          <ButtonLink v-if="cta" class="mx-auto md:mx-0 !mb-0" bold size="large" :href="(cta[1] as any)">
            {{ cta[0] }}
          </ButtonLink>

          <a
            v-if="secondary"
            :href="(secondary[1] as any)"
            class="text-secondary-active border-b border-gray-100 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 py-px font-medium"
          >
            {{ secondary[0] }}
          </a>
        </div>
      </div>

      <Terminal v-if="snippet" :content="snippet" />
    </Container>
  </section>
</template>
