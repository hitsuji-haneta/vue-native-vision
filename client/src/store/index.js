import Vue from 'vue-native-core';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: '',
    isAnalyzing: false
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
      console.log('set!! ', state.userId);
    },
    setAnalysisStatus(state, isAnalyzing) {
      state.isAnalyzing = isAnalyzing;
    }
  }
});

export default store;
