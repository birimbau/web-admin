<template>
  <div class="img-container">
    <img :src="media.data">
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';

import { Concept } from '@/app/models/Concept';
import { Media } from '@/app/models/Media';


export default defineComponent({

  props: {
    concept: {
      type: Concept,
      required: true,
    },
    media: {
      type: Media,
      required: true,
    },
  },
});
</script>

<style scoped>
.img-container {
  height: 150px;
  text-align: center;
}
img {
  max-width: 100%;
  max-height: 100%;
  padding: 0 10px;
}
</style>
