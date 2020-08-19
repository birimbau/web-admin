<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :label="label"
        :value="value"
        v-bind="attrs"
        @input="$emit('input', $event)"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="value" @input="showMenu = false" />
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({

  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },

  setup() {
    const showMenu = ref(false);

    return {
      showMenu,
    };
  },
});
</script>
