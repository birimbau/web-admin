<template>
  <v-container>
    <h2 class="mb5">
      Projects
    </h2>
    <v-list>
      <project-row v-for="project in media.projects" :key="project.id" :project-uuid="project.uuid" />
    </v-list>
    <v-btn color="primary" @click="add()">
      Create new project
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { media } from '@/hooks/state';

export default defineComponent({

  setup() {
    return {
      media,
    };
  },
});
</script>
