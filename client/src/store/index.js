import Vue from 'vue-native-core';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: 'userId'
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
      console.log('set!! ', state.userId);
    }
  }
});

export default store;
