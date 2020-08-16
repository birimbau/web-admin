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
        <component :is="service" v-if="service" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';

import Integration from '@/components/pages/config/integrations/Integration.vue';
import aws from '@/components/pages/config/integrations/aws.vue';
import gcp from '@/components/pages/config/integrations/gcp.vue';
import googleDrive from '@/components/pages/config/integrations/googleDrive.vue';
import { password } from '@/hooks/encryption';
import { secrets } from '@/hooks/secrets';
import { services } from '@/app/models/services';

export enum Services {
  AWS = 'aws',
  GCP = 'gcp',
  GOOGLE_DRIVE = 'googleDrive',
}

export default defineComponent({

  components: {
    Integration,
    aws,
    gcp,
    googleDrive,
  },

  setup() {
    const service: Ref<Services | ''> = ref('');

    const onServiceClick = (slug: Services) => {
      service.value = slug;
    };

    return {
      secrets,
      service,
      services,
      password,
      onServiceClick,
    };
  },
});
</script>
