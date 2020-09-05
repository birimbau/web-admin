<template>
  <div>
    <div>
      <router-link to="/services">
        Pick a service
      </router-link>
    </div>
    <div v-if="ready">
      <router-link to="/concepts">
        Media List
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { ready } from '~/src/state/service';

export default defineComponent({

  setup() {
    return {
      ready,
    };
  },
});
</script>
