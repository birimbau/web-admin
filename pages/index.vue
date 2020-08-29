<template>
  <div>
    <div>
      <component :is="currentStep" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';


import Ready from '@/components/pages/start/steps/Ready.vue';
import SelectService from '@/components/pages/start/steps/SelectService.vue';
import SetCredentials from '@/components/pages/start/steps/SetCredentials.vue';
import { clientName } from '@/hooks/state';

export default defineComponent({

  components: {
    SelectService,
    SetCredentials,
    Ready,
  },

  setup() {
    const currentStep = computed(() => {
      if (!clientName.value) {
        return 'SelectService';
      }

      return 'SetCredentials';
    });

    return {
      currentStep,
    };
  },
});
</script>
