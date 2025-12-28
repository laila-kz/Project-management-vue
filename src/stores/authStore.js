import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    initialized: false,
  }),

  actions: {
    async register(email, password) {
      this.loading = true
      this.error = null
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        this.user = cred.user
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        this.user = cred.user
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle() {
      this.loading = true
      this.error = null
      try {
        const cred = await signInWithPopup(auth, googleProvider)
        this.user = cred.user
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      this.error = null
      try {
        await signOut(auth)
        this.user = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    initAuthListener() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (firebaseUser) => {
          this.user = firebaseUser
          this.initialized = true
          resolve()
        })
      })
    },
  },
})
