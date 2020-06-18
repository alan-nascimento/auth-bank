import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue';

import App from './App.vue';
import http from './services';
import store from './store';
import router from './router';

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.prototype.$http = http; 

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
