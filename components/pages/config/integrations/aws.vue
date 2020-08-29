<template>
  <div>
    <div class="mt-5">
      <v-text-field v-model="secrets.values.AWS_REGION.value" label="AWS Region" />
      <v-text-field v-model="secrets.values.AWS_ACCESS_KEY_ID.value" label="AWS Access Key ID" />
      <v-text-field v-model="secrets.values.AWS_SECRET_ACCESS_KEY.value" label="AWS Secret Access Key" />
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
