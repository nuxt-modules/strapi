<template>
  <div>
    <h1>@nuxtjs/strapi</h1>

    <h2>Url</h2>
    <pre>{{ url }}</pre>
    <h2>Version</h2>
    <pre>{{ version }}</pre>

    <div v-if="user">
      <h2>User</h2>
      <button type="button" @click="logout">
        Logout
      </button>
      <pre>{{ user }}</pre>
    </div>
    <form v-else @submit.prevent="onSubmit">
      <input v-model="form.identifier" placeholder="Email" type="text" name="email" required>

      <input v-model="form.password" placeholder="Password" type="password" name="password" required>

      <button type="submit">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const user = useStrapiUser()
const url = useStrapiUrl()
const version = useStrapiVersion()
const { login, logout } = useStrapiAuth()

const loading = ref(false)
const form = reactive({ identifier: '', password: '' })

const onSubmit = async () => {
  loading.value = true

  try {
    await login(form)
  } catch (e) {}

  loading.value = false
}
</script>
