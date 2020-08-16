<template>
  <v-row>
    <v-col cols="12" sm="6">
      <h2 class="text-h4">
        About yourself
      </h2>
      <v-text-field v-model="user.name" label="Name" />
      <v-text-field v-model="user.email" label="Email" />
      <v-text-field v-model="user.bio" label="Bio" />
    </v-col>
    <v-col cols="12" sm="6">
      <h2 class="text-h4">
        About your website
      </h2>
      <v-text-field v-model="site.title" label="Title" />
      <v-text-field v-model="site.domain" label="Domain" />
      <v-text-field v-model="site.description" label="Description" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { site, user } from '@/hooks/state';


export default defineComponent({

  setup() {
    return {
      site,
      user,
    };
  },
});
</script>
