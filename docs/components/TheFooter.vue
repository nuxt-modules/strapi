<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Made with <NuxtLink
          to="https://ui.nuxt.com/pro"
          target="_blank"
          class="text-primary font-semibold relative group hover:underline hover:underline-offset-4"
        >
          Nuxt UI Pro

          <UIcon
            name="i-heroicons-arrow-up-right-20-solid"
            class="w-3 h-3 absolute top-0 -right-3.5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
          />
        </NuxtLink>
      </span>
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
