import { createApp } from 'vue'
import {createPinia} from "pinia"
import './style.css'
import App from './App.vue'
import router from './router/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { useAuthStore } from './stores/authStore.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()
authStore.initAuthListener().then(() => {
  app.use(router)
  app.mount('#app')
})