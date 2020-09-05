<template>
  <service-form :service="gcp" preview>
    <div>
      <v-text-field v-model="secrets.gcp.apiKey" label="Google Cloud Platform API Key" />
      <v-text-field v-model="secrets.gcp.apiSecret" label="Google Cloud Platform API Secret" />
    </div>
  </service-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { secrets } from '~/src/state/secrets';
import { gcp } from '~/src/state/service';
import ServiceForm from '~/src/vue/components/pages/services/ServiceForm.vue';

export default defineComponent({

  components: {
    ServiceForm,
  },

  setup() {
    return {
      gcp,
      secrets,
    };
  },
});
</script>
