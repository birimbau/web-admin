import Vue from 'vue';

import '~/src/plugins/composition-api';
import { vuetify } from '~/src/plugins/vuetify';
import App from '~/src/App.vue';
import { router } from '~/src/vue/router';


Vue.config.productionTip = false;

new (Vue)({
  router,
  render: (h) => h(App),
  vuetify,
}).$mount('#app');
