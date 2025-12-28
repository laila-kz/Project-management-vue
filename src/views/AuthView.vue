<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Authentification</h2>

          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: mode === 'login' }"
                @click="mode = 'login'"
              >
                Connexion
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: mode === 'register' }"
                @click="mode = 'register'"
              >
                Inscription
              </button>
            </li>
          </ul>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="email"
                type="email"
                required
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Mot de passe</label>
              <input
                v-model="password"
                type="password"
                required
                class="form-control"
              />
            </div>

            <div v-if="authStore.error" class="alert alert-danger py-2">
              {{ authStore.error }}
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="authStore.loading"
            >
              {{ mode === 'login' ? 'Se connecter' : "S'inscrire" }}
            </button>
          </form>

          <hr class="my-4" />

          <button
            class="btn btn-outline-dark w-100"
            @click="handleGoogle"
            :disabled="authStore.loading"
          >
            Se connecter avec Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'AuthView',
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      authStore: useAuthStore(),
      router: useRouter(),
    }
  },
  watch: {
    'authStore.user'(val) {
      if (val) {
        this.router.push({ name: 'dashboard' })
      }
    },
  },
  methods: {
    async handleSubmit() {
      if (this.mode === 'login') {
        await this.authStore.login(this.email, this.password)
      } else {
        await this.authStore.register(this.email, this.password)
      }

      if (this.authStore.user) {
        this.router.push({ name: 'dashboard' })
      }
    },
    async handleGoogle() {
      await this.authStore.loginWithGoogle()
      if (this.authStore.user) {
        this.router.push({ name: 'dashboard' })
      }
    },
  },
}
</script>
