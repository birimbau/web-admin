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
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="secrets.values.GCP_API_KEY.value" label="Google Cloud Platform API Key" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="secrets.values.GCP_API_SECRET.value" label="Google Cloud Platform API Secret" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { password } from '@/hooks/encryption';
import { secrets } from '@/hooks/secrets';

export default defineComponent({

  setup() {
    return {
      secrets,
      password,
    };
  },
});
</script>
