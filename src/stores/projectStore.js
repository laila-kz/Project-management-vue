import { defineStore } from 'pinia';
import { db } from '../firebase/config';
import { 
  collection, addDoc, deleteDoc, updateDoc, doc, getDoc,
  query, where, onSnapshot, serverTimestamp 
} from 'firebase/firestore';
import { useAuthStore } from './authStore';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [],
    currentProject: null,
    tasks: [],
    loading: false,
    error: null,
    unsubscribeProjects: null,
    unsubscribeTasks: null
  }),

  actions: {
    initProjects() {
      const authStore = useAuthStore();
      if (!authStore.user) {
        this.projects = [];
        return;
      }
      this.loading = true;

      const q = query(
        collection(db, 'projects'),
        where('userId', '==', authStore.user.uid)
      );

      this.unsubscribeProjects = onSnapshot(q, (snapshot) => {
        let projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        projectsData.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        this.projects = projectsData;
        this.loading = false;
      }, (err) => {
        console.error(err);
        this.loading = false;
      });
    },

    async addProject(name, description, color) {
      const authStore = useAuthStore();
      if (!authStore.user) return;

      await addDoc(collection(db, 'projects'), {
        name, description, color,
        userId: authStore.user.uid,
        createdAt: serverTimestamp()
      });
    },

    async updateProject(id, updates) {
      try {
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, updates);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteProject(id) {
      await deleteDoc(doc(db, 'projects', id));
    },

    async fetchProject(projectId) {
      try {
        this.loading = true;
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          this.currentProject = { id: docSnap.id, ...docSnap.data() };
        } else {
          this.error = "Projet introuvable";
        }
        this.loading = false;
      } catch (err) {
        console.error(err);
        this.loading = false;
      }
    },

    initTasks(projectId) {
      const tasksRef = collection(db, 'projects', projectId, 'tasks');
      this.unsubscribeTasks = onSnapshot(tasksRef, (snapshot) => {
        let tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        tasksData.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
        this.tasks = tasksData;
      });
    },

    async addTask(projectId, task) {
      await addDoc(collection(db, 'projects', projectId, 'tasks'), {
        ...task,
        createdAt: serverTimestamp()
      });
    },

    async updateTaskStatus(projectId, taskId, newStatus) {
      const taskRef = doc(db, 'projects', projectId, 'tasks', taskId);
      await updateDoc(taskRef, { status: newStatus });
    },

    async deleteTask(projectId, taskId) {
      const taskRef = doc(db, 'projects', projectId, 'tasks', taskId);
      await deleteDoc(taskRef);
    },

    clearCurrentProject() {
      if (this.unsubscribeTasks) this.unsubscribeTasks();
      this.currentProject = null;
      this.tasks = [];
      this.unsubscribeTasks = null;
    }
  }
});