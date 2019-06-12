import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueModal from './plugins/Modal';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import { FontAwesomeIcon }from '@fortawesome/vue-fontawesome';

Vue.use(VueToast);
Vue.use(VueModal);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;

new Vue({
    render: function (h) {
        return h(App);
    },
    router,
    store,
}).$mount('#app');
