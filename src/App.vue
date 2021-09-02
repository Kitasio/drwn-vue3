<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import authFuncs from './composables/authFuncs'

export default defineComponent({
  name: 'App',
  setup() {
    const { dbUser, getUser } = authFuncs()
    getUser()

    return {
      dbUser,
    }
  }
})
</script>
