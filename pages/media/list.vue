<template>
  <div>
    <h1>Media</h1>
    <div v-if="concepts.length">
      <target v-for="concept in concepts" :id="concept.uuid" :key="concept.uuid" name="media__list__detail_link">
        <nuxt-link :to="`/media/detail/${concept.uuid}`">
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
import { defineComponent, ref, Ref, onBeforeMount } from '@vue/composition-api';

import Target from '@/components/atoms/Target.vue';
import { Concept } from '@/app/models/Concept';

export default defineComponent({
  components: {
    Target,
  },

  setup() {
    const concepts: Ref<Concept[]> = ref([]);

    onBeforeMount(async () => {
      const response = await Concept.list();
      console.log(response);
      response.forEach(concept => concepts.value.push(concept));
    });

    return {
      concepts,
    };
  },
});
</script>
