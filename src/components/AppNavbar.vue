<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">ProjectManager</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="user">
            <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <span v-if="user" class="text-light small">
            {{ user.email }}
          </span>
          <button
            v-if="!user"
            class="btn btn-outline-light btn-sm"
            @click="goToAuth"
          >
            Login / Register
          </button>
          <button
            v-else
            class="btn btn-danger btn-sm"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'AppNavbar',
  components: { RouterLink },
  data() {
    return {
      authStore: useAuthStore(),
      router: useRouter(),
    }
  },
  computed: {
    user() {
      return this.authStore.user
    },
  },
  methods: {
    goToAuth() {
      this.router.push({ name: 'auth' })
    },
    async handleLogout() {
      await this.authStore.logout()
      this.router.push({ name: 'home' })
    },
  },
}
</script>
