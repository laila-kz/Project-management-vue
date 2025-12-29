<template>
  <div id="app-container">
    <AppNavbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue';
</script>

<style>
:root {
  --primary-color: #4f46e5;
  --secondary-color: #64748b;
}

html, body {
  height: 100%;
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1e293b;
}

#app-container {
  min-height: 100vh;
  /* Fond Gradient Mesh Pro */
  background-color: #f3f4f6;
  background-image: 
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Styles globaux premium */
.btn {
  font-weight: 600;
  letter-spacing: 0.3px;
  padding: 0.6rem 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:active {
  transform: scale(0.98);
}

.card, .modal-content {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
}
</style>