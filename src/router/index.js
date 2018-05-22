import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import list from '@/components/list';
import user from '@/components/singleUser';

Vue.use(VueResource);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'core',
      component: list,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: user,
    }
  ],
  mode: 'history'
});
