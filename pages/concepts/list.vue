<template>
  <div>
    <h1>Fragment</h1>
    <div v-if="concepts.length">
      <target v-for="concept in concepts" :id="concept.uuid" :key="concept.uuid" name="concepts__list__detail_link">
        <nuxt-link :to="`/concepts/detail/${concept.uuid}`">
          {{ concept.name }}
        </nuxt-link>
      </target>
    </div>
    <div v-else>
      No concepts defined yet.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from '@vue/composition-api';

import Target from '@/components/atoms/Target.vue';
import { Concept } from '@/app/models/Concept';

export default defineComponent({
  components: {
    Target,
  },

  setup() {
    const concepts = ref<Concept[]>([]);

    onBeforeMount(async () => {
      const response = await Concept.list();
      response.forEach(concept => concepts.value.push(concept));
    });

    return {
      concepts,
    };
  },
});
</script>
