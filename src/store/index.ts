import Vue from 'vue';
import Vuex from 'vuex';

import http from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: {},
  },
  mutations: {
    SIGN_IN_USER (state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    SIGN_OUT_USER (state) {
      state.token = null;
      state.user = {};
    }
  },
  actions: {
    async signIn ({ commit }, params) {
      const { data: { access_token, user  } } = await http.post('auth/login', params);

      commit('SIGN_IN_USER', {
        token: access_token,
        user,
      });

      localStorage.setItem('token', access_token);
    }
  },
  modules: {
  },
});
