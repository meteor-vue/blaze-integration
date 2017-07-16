import Vue from 'vue';

import VueBlazeTemplate from './install';

Vue.use(VueBlazeTemplate);

if (Package['akryum:vue-router'] || Package['akryum:vue-router2']) {
  import './router-link';
}

import './vue-component';