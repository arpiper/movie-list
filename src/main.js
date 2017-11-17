import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: undefined,
  },
  mutations: {
    setConfig (state, config) {
      state.config = config
    },
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
