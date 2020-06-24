import Vue from 'vue';

import { createModel } from '@/app/models';

export default (context) => {
    const $models = {
        new: createModel,
    };

    Vue.prototype.$models = $models;
    context.$models = $models;
};
