<template>
  <div>
    <h3>Integrate with Google Cloud Platform</h3>
    <div>
      <v-text-field v-model="secrets.gcp.apiKey" label="Google Cloud Platform API Key" />
      <v-text-field v-model="secrets.gcp.apiSecret" label="Google Cloud Platform API Secret" />
    </div>
    <div>
      Not supported yet.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { secrets } from '@/app/state/secrets';

export default defineComponent({

  setup() {
    return {
      secrets,
    };
  },
});
</script>
