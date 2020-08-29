<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-row dense>
      <v-col cols="3" style="text-align: center">
        <v-img :src="service.logo" class="ma-3" />
      </v-col>
      <v-col cols="9" class="pr-3">
        <div>
          <span class="text-overline">{{ service.name }}</span>
        </div>
        <div>
          <span class="text-caption">
            {{ service.description }}
          </span>
        </div>
        <div class="text-right">
          <div v-if="selected">
            <v-btn small text color="error" @click="deselect">
              Use another service
            </v-btn>
          </div>
          <div v-else>
            <v-btn small text color="primary" @click="select">
              Select
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

import { clientName } from '@/hooks/state';
import { Service } from '@/app/models/services';
import Target from '@/components/atoms/Target.vue';

export default defineComponent({

  components: {
    Target,
  },

  props: {
    service: {
      type: Object as () => Service,
      required: true,
    },
  },

  setup(props, context) {
    const selected = computed(() => props.service.slug === clientName.value);

    const select = () => {
      clientName.value = props.service.slug;
      window.localStorage.setItem('PHOTION_INTEGRATION', props.service.slug);
      context.emit('select', props.service.slug);
    };

    const deselect = () => {
      clientName.value = '';
      window.localStorage.removeItem('PHOTION_INTEGRATION');
      context.emit('deselect', props.service.slug);
    };

    return {
      selected,
      select,
      deselect,
    };
  },
});
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
