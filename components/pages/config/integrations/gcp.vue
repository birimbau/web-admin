<template>
  <div>
    <h3>Integrate with Google Cloud Platform</h3>
    <div>
      <v-text-field v-model="secrets.values.GCP_API_KEY.value" label="Google Cloud Platform API Key" />
      <v-text-field v-model="secrets.values.GCP_API_SECRET.value" label="Google Cloud Platform API Secret" />
    </div>
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
