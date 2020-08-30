<template>
  <div>
    <div class="mt-5">
      <v-text-field v-model="secrets.aws.region" label="AWS Region" />
      <v-text-field v-model="secrets.aws.accessKeyId" label="AWS Access Key ID" />
      <v-text-field v-model="secrets.aws.secretAccessKey" label="AWS Secret Access Key" />
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
