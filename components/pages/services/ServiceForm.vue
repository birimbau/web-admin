<template>
  <div>
    <div>
      <p>Wonderful! You selected {{ service.name }}.</p>
      <p>Photion needs your credentials.</p>
    </div>
    <div>
      <v-row dense>
        <v-col cols="6">
          <div>
            <v-text-field v-model="user.name" label="Photion Username" />
            <v-text-field v-model="user.password" type="password" label="Encryption Password" />
          </div>
          <div class="mb-5 pt-5">
            <slot />
          </div>
          <div v-if="preview">
            <v-btn text color="error" disabled>
              Coming Soon
            </v-btn>
          </div>
          <div v-else>
            <v-btn text color="primary" @click="onContinue">
              Continue
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <integration :service="service" selected />
        </v-col>
      </v-row>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, useContext, watch, toRef } from '@nuxtjs/composition-api';

import { user } from '@/app/state/user';
import { save, load } from '@/app/state/secrets';
import { Service, clientName } from '@/app/state/service';
import Integration from '@/components/pages/services/Integration.vue';


export default defineComponent({

  components: {
    Integration,
  },

  props: {
    preview: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object as () => Service,
      required: true,
    },
  },

  setup(props) {
    const { redirect } = useContext();

    const onContinue = () => {
      clientName.value = props.service.slug;
      save();
      redirect('/');
    };

    watch([
      toRef(user, 'name'),
      toRef(user, 'password'),
    ], async () => {
      sessionStorage.setItem('PHOTION_USERNAME', user.name);

      try {
        return await load();
      } catch (error) {
        return error;
      }
    });

    return {
      user,
      onContinue,
    };
  },
});
</script>
