<template>
  <div>
    <div>
      <h1 class="text-h4">
        Integrations
      </h1>
    </div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="password" type="password" label="Encryption Password" />
        <v-btn text color="primary" @click="secrets.save">
          Save
        </v-btn>
        <v-btn text color="error" @click="secrets.load">
          Restore
        </v-btn>
        <div>
          <integration v-for="service in services" :key="service.slug" :service="service" @click="onServiceClick" />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <component :is="clientName" v-if="clientName" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Integration from '@/components/pages/config/integrations/Integration.vue';
import aws from '@/components/pages/config/integrations/aws.vue';
import gcp from '@/components/pages/config/integrations/gcp.vue';
import googleDrive from '@/components/pages/config/integrations/googleDrive.vue';
import { clientName } from '@/hooks/api';
import { password } from '@/hooks/encryption';
import { secrets } from '@/hooks/secrets';
import { services } from '@/app/models/services';


export default defineComponent({

  components: {
    Integration,
    aws,
    gcp,
    googleDrive,
  },

  setup() {
    const onServiceClick = (slug: string) => {
      clientName.value = slug;
      window.localStorage.setItem('PHOTION_INTEGRATION', slug);
    };

    return {
      secrets,
      clientName,
      services,
      password,
      onServiceClick,
    };
  },
});
</script>
