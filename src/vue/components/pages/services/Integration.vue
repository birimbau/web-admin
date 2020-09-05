<template>
  <v-card
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
            <router-link to="/services">
              <v-btn small text color="error">
                Use another service
              </v-btn>
            </router-link>
          </div>
          <div v-else>
            <router-link :to="'/services/' + service.slug">
              <v-btn small text color="primary">
                Select
              </v-btn>
            </router-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { Service } from '~/src/models/services';

export default defineComponent({

  props: {
    service: {
      type: Object as () => Service,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
}
.text-right {
  text-align: right;
}

img {
  max-width: 100%;
}
</style>
