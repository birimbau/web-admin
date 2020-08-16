<template>
  <div>
    <h3>Integrate with Amazon Web Services</h3>
    <div />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { secrets } from '@/hooks/secrets';

export default defineComponent({

  setup() {
    return {
      secrets,
    };
  },
});
</script>
