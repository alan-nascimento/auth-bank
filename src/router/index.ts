import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      private: true,
    }
  },
  {
    path: '/managers',
    name: 'Managers',
    component: () => import(/* webpackChunkName: "managers" */ '@/views/Managers.vue'),
    meta: {
      private: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.private && !store.state.token) {
    return next({ path: '/login' });
  }

  next();
})

export default router;
