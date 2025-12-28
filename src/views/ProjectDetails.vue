<template>
  <div class="mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-3">
              Détails du projet
            </h2>
            <p class="lead">
              Page projet <strong>{{ projectId }}</strong>
            </p>
            <p class="text-muted mb-0">
              Personne B ajoutera ici le tableau Kanban (tâches To Do / Doing / Done).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetails',
  computed: {
    projectId() {
      return this.$route.params.id
    },
  },
}
</script>
