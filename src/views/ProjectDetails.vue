<template>
  <div class="container-fluid py-4 h-100 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-center mb-4 container">
      <div class="d-flex align-items-center gap-3">
        <router-link to="/dashboard" class="btn btn-light rounded-circle shadow-sm" title="Retour">⬅️</router-link>
        <h2 class="m-0 fw-bold" v-if="projectStore.currentProject">{{ projectStore.currentProject.name }}</h2>
      </div>
      <button class="btn btn-primary rounded-pill px-4 shadow-sm" @click="showModal = true">+ Tâche</button>
    </div>

    <div class="row flex-grow-1 g-4 overflow-auto px-2" v-if="!projectStore.loading">
      <div class="col-md-4 d-flex flex-column h-100" @dragover.prevent @drop="onDrop($event, 'todo')">
        <div class="p-3 bg-white bg-opacity-50 rounded-4 h-100 shadow-sm border border-white d-flex flex-column">
          <h6 class="fw-bold text-secondary mb-3 px-2">🎯 À FAIRE ({{ todoTasks.length }})</h6>
          <div class="flex-grow-1 overflow-y-auto px-1 custom-scroll">
            <TaskCard v-for="task in todoTasks" :key="task.id" :task="task" @delete-task="handleDelete" />
          </div>
        </div>
      </div>

      <div class="col-md-4 d-flex flex-column h-100" @dragover.prevent @drop="onDrop($event, 'doing')">
        <div class="p-3 bg-white bg-opacity-50 rounded-4 h-100 shadow-sm border border-white d-flex flex-column">
          <h6 class="fw-bold text-primary mb-3 px-2">⚡ EN COURS ({{ doingTasks.length }})</h6>
          <div class="flex-grow-1 overflow-y-auto px-1 custom-scroll">
            <TaskCard v-for="task in doingTasks" :key="task.id" :task="task" @delete-task="handleDelete" />
          </div>
        </div>
      </div>

      <div class="col-md-4 d-flex flex-column h-100" @dragover.prevent @drop="onDrop($event, 'done')">
        <div class="p-3 bg-white bg-opacity-50 rounded-4 h-100 shadow-sm border border-white d-flex flex-column">
          <h6 class="fw-bold text-success mb-3 px-2">✅ TERMINÉ ({{ doneTasks.length }})</h6>
          <div class="flex-grow-1 overflow-y-auto px-1 custom-scroll">
            <TaskCard v-for="task in doneTasks" :key="task.id" :task="task" @delete-task="handleDelete" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Nouvelle Tâche</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleAddTask">
              <div class="mb-3">
                <label class="form-label text-muted small fw-bold">TITRE</label>
                <input v-model="newTask.title" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted small fw-bold">DESCRIPTION</label>
                <textarea v-model="newTask.description" class="form-control" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted small fw-bold">DATE LIMITE</label>
                <input v-model="newTask.deadline" type="date" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '../stores/projectStore';
import TaskCard from '../components/TaskCard.vue';

const route = useRoute();
const projectStore = useProjectStore();
const projectId = route.params.id;
const showModal = ref(false);
const newTask = ref({ title: '', description: '', deadline: '', status: 'todo' });

onMounted(() => {
  projectStore.fetchProject(projectId);
  projectStore.initTasks(projectId);
});

onUnmounted(() => projectStore.clearCurrentProject());

const todoTasks = computed(() => projectStore.tasks.filter(t => t.status === 'todo'));
const doingTasks = computed(() => projectStore.tasks.filter(t => t.status === 'doing'));
const doneTasks = computed(() => projectStore.tasks.filter(t => t.status === 'done'));

const handleAddTask = async () => {
  await projectStore.addTask(projectId, { ...newTask.value });
  showModal.value = false;
  newTask.value = { title: '', description: '', deadline: '', status: 'todo' };
};

const handleDelete = async (taskId) => {
  if(confirm('Supprimer cette tâche ?')) await projectStore.deleteTask(projectId, taskId);
};

const onDrop = (event, newStatus) => {
  const taskId = event.dataTransfer.getData('taskId');
  if (taskId) projectStore.updateTaskStatus(projectId, taskId, newStatus);
};
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { width: 6px; }
.custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 4px; }
.modal-backdrop { background-color: rgba(0,0,0,0.4); backdrop-filter: blur(2px); z-index: 1040; }
.modal { z-index: 1050; }
</style>