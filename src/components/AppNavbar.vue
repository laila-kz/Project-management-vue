<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
        <span class="text-primary bg-white rounded px-2 me-2 shadow-sm">P</span>
        <span class="text-white">ProjectManager</span>
      </router-link>

      <button 
        class="navbar-toggler bg-primary border-0 shadow-sm" 
        type="button" 
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ 'show': isOpen }">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-lg-3">
          <li class="nav-item">
            <router-link class="nav-link text-light fw-medium" to="/" @click="closeMenu">
              Accueil
            </router-link>
          </li>
          
          <template v-if="authStore.user">
            <li class="nav-item">
              <router-link class="nav-link text-light fw-medium" to="/dashboard" @click="closeMenu">
                Dashboard
              </router-link>
            </li>
            
            <li class="nav-item ms-lg-2 mt-3 mt-lg-0">
              <div class="d-flex flex-column flex-lg-row align-items-center gap-3">
                <span class="text-white-50 small">{{ authStore.user.email }}</span>
                <button @click="handleLogout" class="btn btn-danger btn-sm px-3 shadow-sm rounded-pill">
                  Déconnexion
                </button>
              </div>
            </li>
          </template>

          <template v-else>
            <li class="nav-item ms-lg-2 mt-3 mt-lg-0">
              <router-link to="/auth" class="btn btn-primary px-4 shadow-sm rounded-pill" @click="closeMenu">
                Connexion
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleLogout = async () => {
  closeMenu();
  await authStore.logout();
  router.push('/auth');
};
</script>

<style scoped>
.navbar-toggler:focus {
  box-shadow: none;
}

/* Animation fluide */
.navbar-collapse {
  transition: all 0.3s ease-in-out;
}

/* --- CORRECTION RESPONSIVE ICI --- */
@media (max-width: 991px) {
  .navbar-collapse {
    /* On passe en fond SOMBRE (Dark) pour que le texte blanc soit visible */
    background: rgba(33, 37, 41, 0.95); /* C'est la couleur bg-dark de Bootstrap */
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5); /* Ombre plus forte pour le contraste */
    border: 1px solid rgba(255, 255, 255, 0.1); /* Petite bordure subtile */
  }
}
</style>