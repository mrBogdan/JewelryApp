import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VuePopup from './components/Popup/VueModal'

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VuePopup);

Vue.config.productionTip = false;

new Vue({
  render: function (h) { return h(App) },
  router,
  store,
}).$mount('#app');
