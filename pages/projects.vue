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
import Vue from 'vue';
import { v4 as uuid4 } from 'uuid';
import { defineComponent } from '@vue/composition-api';

import ProjectRow from '@/components/pages/projects/ProjectRow.vue';
import { media } from '@/hooks/state';

export const addProject = () => {
  const project = {
    uuid: uuid4(),
    name: '',
    description: '',
  };

  Vue.set(media.value.projects, project.uuid, project);
};
export default defineComponent({

  components: {
    ProjectRow,
  },

  setup() {
    return {
      media,
      addProject,
    };
  },
});
</script>
