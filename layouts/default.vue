<template>
  <v-app>
    <div class="mt-5 mx-auto photion-container">
      <header>
        <nuxt-link to="/">
          <h1 class="mb-10">
            <span class="text-h2">
              Photion
            </span>
            <span v-if="service" class="text-caption">with {{ service.name }}</span>
          </h1>
        </nuxt-link>
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
import { defineComponent, ref, onBeforeMount } from '@nuxtjs/composition-api';
import { init } from '@/app/state/secrets';
import { service } from '@/app/state/service';


export default defineComponent({

  setup() {
    const title = ref('Photion Admin');

    onBeforeMount(init);

    return {
      title,
      service,
    };
  },
});
</script>

<style scoped>
.title {
  text-decoration: none;
  color: black;
}

a {
  text-decoration: none;
  color: black !important;
}

.photion-container {
  max-width: 1000px;
  width: 100%;
}
</style>
