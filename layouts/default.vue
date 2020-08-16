<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app />
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="text-h5" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="false" app class="text-caption">
      <span>Photion Admin. Released under GNU Affero 3.0</span>
      <v-spacer />
      <a href="https://github.com/photion/Admin" target="_blank">Source code available on GitHub</a>
    </v-footer>
  </v-app>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({

  setup() {
    const drawer = ref(false);
    const title = ref('Photion Admin');

    return {
      drawer,
      title,
    };
  },
});
</script>
