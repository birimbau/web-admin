import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

import { secrets } from '@/hooks/secrets';

Vue.use(VueCompositionApi);
secrets.init();
