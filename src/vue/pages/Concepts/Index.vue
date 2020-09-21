<template>
  <div>
    <v-row>
      <v-col cols="12" sm="1" order="1" orderSm="2">
        <v-btn text color="primary" @click="methods.open()" outlined>Create New</v-btn>
      </v-col>
      <v-col cols="12" sm="11" order="2" orderSm="1">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="text-left">
                <th>Concept</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="concept in concepts" :key="concept.uuid">
                <td>{{ concept.name }}</td>
                <td class="text-right">
                  <v-btn text color="primary" @click="methods.open(concept)">Open</v-btn>
                  <v-btn text color="error">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from '@vue/composition-api';

import { router } from '~/src/vue/router';
import Target from '~/src/vue/components/atoms/Target.vue';
import { Concept } from '~/src/models/Concept';

export default defineComponent({
  components: {
    Target,
  },

  setup(_props, context) {
    const concepts = ref<Concept[]>([]);

    onBeforeMount(async () => {
      const response = await Concept.list();
      response.forEach(concept => concepts.value.push(concept));
    });

    const methods = {
      open: (concept: Concept | undefined) => {
        const target = concept?.uuid ?? 'new';
        router.push(`/concepts/${target}`);
      },
    };

    return {
      concepts,
      methods,
    };
  },
});
</script>
