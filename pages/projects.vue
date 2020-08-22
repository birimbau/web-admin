<template>
  <v-container>
    <h2 class="mb5">
      Projects
    </h2>
    <v-list>
      <project-row v-for="project in media.projects" :key="project.uuid" :uuid="project.uuid" />
    </v-list>
    <v-btn id="projects__add_project" color="primary" @click="addProject">
      Create new project
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, useFetch } from '@nuxtjs/composition-api';

import { Project } from '@/app/models/Project';
import ProjectRow from '@/components/pages/projects/ProjectRow.vue';

export default defineComponent({

  components: {
    ProjectRow,
  },

  setup() {
    const projects = ref<Project[]>([]);

    useFetch(async () => {
      const response = await Project.list();
      response.forEach(project => projects.value.push(project));
    });

    const addProject = () => {
      const project = new Project({});
      projects.value.push(project);
    };

    return {
      projects,
      addProject,
    };
  },
});
</script>
