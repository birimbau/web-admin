<template>
  <div class="img-container">
    <img :src="fragment.url">
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';

import { Concept } from '@/app/models/Concept';
import { Fragment } from '@/app/models/Fragment';


export default defineComponent({

  props: {
    concept: {
      type: Concept,
      required: true,
    },
    fragment: {
      type: Fragment,
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
