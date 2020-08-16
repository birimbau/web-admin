<template>
  <div>
    <h1>Media</h1>
    <div v-if="hasConcepts">
      <target v-for="concept in media.concepts" :id="concept.uuid" :key="concept.uuid" name="media__list__detail_link">
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
import { defineComponent, computed } from '@vue/composition-api';

import Target from '@/components/atoms/Target.vue';
import { media } from '@/hooks/state';

export default defineComponent({
  components: {
    Target,
  },

  setup() {
    const hasConcepts = computed(() => Boolean(Object.keys(media.value.concepts).length));

    return {
      hasConcepts,
      media,
    };
  },
});
</script>
