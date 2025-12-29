<template>
  <div class="card mb-3 border-0 shadow-sm task-card" draggable="true" @dragstart="onDragStart">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-start">
        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">{{ task.title }}</h6>
        <button class="btn btn-link text-secondary p-0 ms-2 text-decoration-none" @click="$emit('delete-task', task.id)">&times;</button>
      </div>
      <p class="text-secondary small mb-2 text-break" style="font-size: 0.85rem;">{{ task.description }}</p>
      <div v-if="task.deadline" class="mt-2">
        <span class="badge rounded-pill fw-normal" :class="isLate ? 'bg-danger bg-opacity-10 text-danger' : 'bg-light text-dark border'">
          📅 {{ formatDate(task.deadline) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['delete-task']);

const onDragStart = (event) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('taskId', props.task.id);
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
const isLate = computed(() => props.task.deadline && new Date(props.task.deadline) < new Date().setHours(0,0,0,0));
</script>

<style scoped>
.task-card { cursor: grab; background: white; transition: all 0.2s; }
.task-card:active { cursor: grabbing; }
.task-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08)!important; }
</style>