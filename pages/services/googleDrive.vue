<template>
  <service-form :service="googleDrive" preview>
    <div>
      No fields.
    </div>
  </service-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { secrets } from '@/app/state/secrets';
import { googleDrive } from '@/app/state/service';
import ServiceForm from '@/components/pages/services/ServiceForm.vue';

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
