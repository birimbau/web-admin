<template>
  <target :id="service.slug" name="integrations__integration">
    <v-sheet
      class="pa-5 ma-5 config__integrations__integration"
      :elevation="10"
      @click="onclick"
    >
      <v-row>
        <v-col cols="3 py-0">
          <div>
            <img :src="service.logo">
          </div>
        </v-col>
        <v-col cols="9" class="py-0">
          <strong>{{ service.name }}</strong>
        </v-col>
      </v-row>
    </v-sheet>
  </target>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

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
    const onclick = () => {
      context.emit('click', props.service.slug);
    };

    return {
      onclick,
    };
  },
});
</script>

<style scoped>
.config__integrations__integration {
  cursor: pointer;
}

.config__integrations__integration:hover {
  background-color: antiquewhite;
  transition: background-color 0.6s;
}

.config__integrations__integration img {
  max-width: 100%;
}
</style>
