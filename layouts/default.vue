<template>
  <v-app>
    <div class="mt-5 mx-auto" style="max-width: 1000px">
      <header>
        <h1 class="text-h2 mb-10">
          Photion
        </h1>
      </header>
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
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({

  setup() {
    const title = ref('Photion Admin');
    return {
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
