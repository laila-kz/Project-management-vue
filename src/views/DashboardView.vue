<template>
  <div class="mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-3">Dashboard</h2>

            <p class="lead mb-1">
              Bienvenue sur ton espace de gestion de projets.
            </p>

            <p v-if="user" class="mb-3">
              Connecté en tant que : <strong>{{ user.email }}</strong>
            </p>

            <p v-else class="text-muted">
              Aucun utilisateur connecté. Tu ne devrais pas voir cette page sans être authentifié.
            </p>

            <hr />

            <p class="mb-0">
              Plus tard, ici tu verras :
            </p>
            <ul class="mb-0">
              <li>La liste de tes projets.</li>
              <li>Des raccourcis vers les tableaux Kanban.</li>
              <li>Des statistiques de productivité.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  name: 'DashboardView',
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  computed: {
    user() {
      return this.authStore.user
    },
  },
}
</script>
