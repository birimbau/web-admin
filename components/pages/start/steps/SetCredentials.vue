<template>
  <div>
    <div>
      <p>Wonderful! You selected {{ currentService.name }}.</p>
      <p>Photion needs your credentials.</p>
    </div>
    <div>
      <v-row dense>
        <v-col cols="6">
          <div>
            <v-text-field v-model="username" label="Photion Username" />
            <v-text-field v-model="password" type="password" label="Encryption Password" />
          </div>
          <div>
            <component :is="currentService.slug" />
          </div>
          <div>
            <v-btn text color="primary" @click="onContinue">
              Continue
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <integration :service="currentService" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, useContext, watch } from '@nuxtjs/composition-api';

import { username, password } from '@/hooks/encryption';
import { secrets } from '@/hooks/secrets';
import { currentService } from '@/hooks/state';
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
      secrets.save();
      redirect('/');
    };

    watch([username, password], async () => {
      sessionStorage.setItem('PHOTION_USERNAME', username.value);

      try {
        return await secrets.load();
      } catch (error) {
        return error;
      }
    });

    return {
      currentService,
      password,
      secrets,
      username,
      onContinue,
    };
  },
});
</script>
