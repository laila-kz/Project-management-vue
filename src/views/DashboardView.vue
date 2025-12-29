<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
      <div>
        <h2 class="fw-bold mb-1 text-dark">Mes Projets</h2>
        <p class="text-muted mb-0">Espace de travail personnel</p>
      </div>
      <button class="btn btn-primary shadow-sm rounded-pill px-4" @click="openModal(null)">
        + Nouveau Projet
      </button>
    </div>

    <div v-if="projectStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="projectStore.projects.length === 0" class="text-center py-5 card border-0">
      <div class="card-body">
        <h4 class="text-dark mb-3">C'est vide ici !</h4>
        <p class="text-muted mb-4">Créez votre premier projet pour commencer.</p>
        <button class="btn btn-outline-primary rounded-pill px-4" @click="openModal(null)">
          Créer un projet
        </button>
      </div>
    </div>

    <div v-else class="row g-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="project in projectStore.projects" :key="project.id">
        <div class="card h-100 project-card border-0">
          <div :style="{ backgroundColor: project.color, height: '8px' }" class="card-img-top rounded-top"></div>
          
          <div class="card-body d-flex flex-column p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h5 class="card-title fw-bold text-truncate me-2 mb-0" :title="project.name">
                {{ project.name }}
              </h5>
              <div class="d-flex gap-2 flex-shrink-0">
                <button class="btn btn-light btn-sm rounded-circle p-2 lh-1" @click.stop="openModal(project)">✏️</button>
                <button class="btn btn-light btn-sm rounded-circle p-2 lh-1 text-danger" @click.stop="confirmDelete(project.id)">🗑️</button>
              </div>
            </div>
            
            <p class="card-text text-secondary flex-grow-1 small mb-4">
              {{ project.description || 'Aucune description' }}
            </p>
            
            <router-link 
              :to="`/projects/${project.id}`" 
              class="btn w-100 text-white rounded-pill fw-bold"
              :style="{ backgroundColor: project.color, borderColor: project.color }"
            >
              Voir le tableau
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <ProjectModal 
      v-if="showModal" 
      :projectToEdit="selectedProject" 
      @close="closeModal" 
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProjectStore } from '../stores/projectStore';
import ProjectModal from '../components/ProjectModal.vue';

const projectStore = useProjectStore();
const showModal = ref(false);
const selectedProject = ref(null);

onMounted(() => projectStore.initProjects());

const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
};

const closeModal = () => {
  selectedProject.value = null;
  showModal.value = false;
};

const handleSave = async (payload) => {
  if (payload.id) {
    await projectStore.updateProject(payload.id, payload.data);
  } else {
    await projectStore.addProject(payload.data.name, payload.data.description, payload.data.color);
  }
  closeModal();
};

const confirmDelete = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
    await projectStore.deleteProject(id);
  }
};
</script>

<style scoped>
.project-card { transition: transform 0.2s; }
.project-card:hover { transform: translateY(-5px); }
</style>