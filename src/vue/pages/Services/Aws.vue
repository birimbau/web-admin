<template>
  <service-form :service="aws">
    <v-text-field v-model="secrets.aws.region" label="AWS Region" />
    <v-text-field v-model="secrets.aws.accessKeyId" label="AWS Access Key ID" />
    <v-text-field v-model="secrets.aws.secretAccessKey" label="AWS Secret Access Key" />
  </service-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { secrets } from '~/src/state/secrets';
import { aws } from '~/src/state/service';
import ServiceForm from '~/src/vue/components/pages/services/ServiceForm.vue';

export default defineComponent({

  components: {
    ServiceForm,
  },

  setup() {
    return {
      aws,
      secrets,
    };
  },
});
</script>
