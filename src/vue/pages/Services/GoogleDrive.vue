<template>
  <service-form :service="googleDrive" preview>
    <div>
      No fields.
    </div>
  </service-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { secrets } from '~/src/state/secrets';
import { googleDrive } from '~/src/state/service';
import ServiceForm from '~/src/vue/components/pages/services/ServiceForm.vue';

export default defineComponent({

  components: {
    ServiceForm,
  },

  setup() {
    return {
      googleDrive,
      secrets,
    };
  },
});
</script>
