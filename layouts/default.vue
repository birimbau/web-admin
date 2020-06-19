<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app />
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
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
      <a href="https://github.com/photion/Admin" target="_blank">Source code available on GitHub</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      title: 'Photion Admin'
    }
  }
}
</script>
