<template>
  <v-app>
    <v-app-bar fixed app>
      <nuxt-link to="/" class="text-h5 title" v-text="title" />
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
      <a href="https://github.com/photion/web-admin" target="_blank">Source code available on GitHub</a>
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

<style scoped>
.title {
  text-decoration: none;
  color: black;
}
</style>
