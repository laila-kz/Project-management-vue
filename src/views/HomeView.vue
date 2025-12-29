<template>
  <div class="container py-5 h-100 d-flex flex-column justify-content-center">
    
    <div class="text-center mb-5 animate-up">
      <h1 class="display-3 fw-bold mb-3 text-dark">
        Gérez vos projets avec <span class="text-primary">fluidité</span>
      </h1>
      <p class="lead text-secondary mb-4 mx-auto" style="max-width: 700px;">
        L'outil de gestion de tâches intuitif pour les créatifs et les développeurs.
        Centralisez, priorisez et livrez vos projets plus vite.
      </p>
      
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <router-link 
          v-if="authStore.user" 
          to="/dashboard" 
          class="btn btn-primary btn-lg px-5 py-3 shadow-lg rounded-pill"
        >
          Accéder à mon Espace &rarr;
        </router-link>
        <template v-else>
          <router-link to="/auth" class="btn btn-primary btn-lg px-5 py-3 shadow-lg rounded-pill">
            Commencer gratuitement
          </router-link>
          <a href="#features" class="btn btn-outline-secondary btn-lg px-5 py-3 rounded-pill bg-white">
            Découvrir
          </a>
        </template>
      </div>
    </div>

    <div id="features" class="row g-4 mt-4">
      <div class="col-md-4 animate-up delay-1">
        <div class="card h-100 border-0 p-4 feature-card">
          <div class="icon-box bg-primary bg-opacity-10 text-primary mb-3">
            <span class="fs-3">📊</span>
          </div>
          <h4 class="fw-bold mb-2">Kanban Intuitif</h4>
          <p class="text-muted">
            Organisez visuellement vos tâches. Glissez-déposez vos cartes pour suivre l'avancement en un clin d'œil.
          </p>
        </div>
      </div>

      <div class="col-md-4 animate-up delay-2">
        <div class="card h-100 border-0 p-4 feature-card">
          <div class="icon-box bg-warning bg-opacity-10 text-warning mb-3">
            <span class="fs-3">⚡</span>
          </div>
          <h4 class="fw-bold mb-2">Temps Réel</h4>
          <p class="text-muted">
            La synchronisation instantanée permet une collaboration fluide. Vos données sont toujours à jour.
          </p>
        </div>
      </div>

      <div class="col-md-4 animate-up delay-3">
        <div class="card h-100 border-0 p-4 feature-card">
          <div class="icon-box bg-success bg-opacity-10 text-success mb-3">
            <span class="fs-3">🔒</span>
          </div>
          <h4 class="fw-bold mb-2">Sécurisé</h4>
          <p class="text-muted">
            Authentification robuste et stockage cloud sécurisé. Vos projets sont accessibles partout, tout le temps.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
const authStore = useAuthStore();
</script>

<style scoped>
.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature-card {
  transition: transform 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  background: white;
}
.animate-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
</style>