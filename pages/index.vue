<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card outlined class="elevation-10">
          <v-card-text>
            <h3 class="mb-5">
              Configuration
            </h3>
            <div>
              <nuxt-link :to="{ name: 'config-owner' }">
                About yourself
              </nuxt-link>
            </div>
            <div>
              <nuxt-link :to="{ name: 'config-integrations' }">
                Integrations
              </nuxt-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="elevation-10">
          <v-card-text>
            <h3 class="mb-5">
              Projects
            </h3>
            <div>
              <nuxt-link :to="{ name: 'projects' }">
                Create or edit projects
              </nuxt-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="elevation-10">
          <v-card-text>
            <h3 class="mb-5">
              Media
            </h3>
            <div>
              <nuxt-link :to="{ name: 'media-detail-id' }">
                Add new media
              </nuxt-link>
            </div>
            <div>
              <nuxt-link :to="{ name: 'media-list' }">
                List existing media
              </nuxt-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({

});
</script>
