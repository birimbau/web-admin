<template>
  <div>
    <div>
      <nuxt-link to="/services">
        Pick a service
      </nuxt-link>
    </div>
    <div v-if="ready">
      <nuxt-link to="/concepts/list">
        Media List
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';

import { ready } from '@/app/state/service';

export default defineComponent({

  setup() {
    return {
      ready,
    };
  },
});
</script>
