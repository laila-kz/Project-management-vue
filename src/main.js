import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css' 
import './assets/main.css'

import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/authStore'

let app;

const pinia = createPinia()

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App)
    
    app.use(pinia)
    app.use(router)

    if (user) {
      const authStore = useAuthStore()
      authStore.user = user
    }

    app.mount('#app')
  }
})
