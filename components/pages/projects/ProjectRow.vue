<template>
  <target :id="project.uuid" name="project_row">
    <v-text-field
      v-model="project.name"
      class="project__name"
      type="text"
      label="Name"
    />
    <v-text-field
      v-model="project.description"
      class="project__description"
      type="text"
      label="Description"
    />
  </target>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Target from '@/components/atoms/Target.vue';
import { media } from '@/hooks/state';

export default defineComponent({
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },

  components: {
    Target,
  },

  setup(props: { uuid: string }) {
    const project = media.value.projects[props.uuid];

    return {
      project,
    };
  },
});
</script>
