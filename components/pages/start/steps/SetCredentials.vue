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
          <div>
            <component :is="service.slug" />
          </div>
          <div>
            <v-btn text color="primary" @click="onContinue">
              Continue
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <integration :service="service" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, useContext, watch, toRef } from '@nuxtjs/composition-api';

import { user } from '@/app/state/user';
import { save, load } from '@/app/state/secrets';
import { service } from '@/app/state/service';
import Integration from '@/components/pages/config/integrations/Integration.vue';
import aws from '@/components/pages/config/integrations/aws.vue';
import gcp from '@/components/pages/config/integrations/gcp.vue';
import googleDrive from '@/components/pages/config/integrations/googleDrive.vue';


export default defineComponent({

  components: {
    Integration,
    aws,
    gcp,
    googleDrive,
  },

  setup(_props) {
    const { redirect } = useContext();

    const onContinue = () => {
      save();
      redirect('/');
    };

    watch([
      toRef(user, 'name'),
      toRef(user, 'password'),
    ], async () => {
      sessionStorage.setItem('PHOTION_USERNAME', user.name);

      try {
        console.log('Loading');
        return await load();
      } catch (error) {
        console.log(error);
        return error;
      }
    });

    return {
      service,
      user,
      onContinue,
    };
  },
});
</script>
