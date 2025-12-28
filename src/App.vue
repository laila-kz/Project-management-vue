<template>
  <div>
    <AppNavbar />
    <div class="container mt-4">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    RouterView,
  },
}
</script>
