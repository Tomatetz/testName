import Vue from 'vue'
import App from './App.vue'
import Icon from 'vue-awesome/components/Icon'
import router from './router';

Vue.config.productionTip = false
Vue.component('icon', Icon)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
