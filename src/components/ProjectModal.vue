<template>
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold">{{ isEditing ? 'Modifier' : 'Nouveau Projet' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label text-muted small fw-bold">NOM</label>
              <input v-model="formData.name" type="text" class="form-control" required placeholder="Ex: App Mobile">
            </div>
            <div class="mb-3">
              <label class="form-label text-muted small fw-bold">DESCRIPTION</label>
              <textarea v-model="formData.description" class="form-control" rows="3"></textarea>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted small fw-bold">COULEUR</label>
              <input v-model="formData.color" type="color" class="form-control form-control-color w-100 rounded">
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary rounded-pill py-2">
                {{ isEditing ? 'Enregistrer' : 'Créer le projet' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ projectToEdit: Object });
const emit = defineEmits(['close', 'save']);
const isEditing = ref(false);
const formData = ref({ name: '', description: '', color: '#4f46e5' });

onMounted(() => {
  if (props.projectToEdit) {
    isEditing.value = true;
    formData.value = { ...props.projectToEdit };
  }
});

const handleSubmit = () => {
  emit('save', { id: props.projectToEdit?.id, data: { ...formData.value } });
};
</script>

<style scoped>
.modal-backdrop { background-color: rgba(0,0,0,0.4); backdrop-filter: blur(2px); z-index: 1040; }
.modal { z-index: 1050; }
</style>