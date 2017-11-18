import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: undefined,
    watchList: localStorage.getItem("movie_watch_list")
  },
  getters: {
    getWatchList (state) {
      return JSON.parse(state.watchList)
    },
  },
  mutations: {
    setConfig (state, config) {
      state.config = config
    },
    addMovieToList (state, movie) {
      let w = []
      if (state.watchList) {
        w = JSON.parse(state.watchList)
      }
      // add custom values to store
      movie.collapsed = true
      movie.watched = false
      movie.watched_on = undefined
      w.push(movie)
      state.watchList = JSON.stringify(w)
      localStorage.setItem("movie_watch_list", JSON.stringify(w))
    },
    toggleMovie (state, index) {
      let w = JSON.parse(state.watchList)
      w[index].collapsed = !w[index].collapsed
      state.watchList = JSON.stringify(w)
      localStorage.setItem("movie_watch_list", JSON.stringify(w))
    },
  },
  actions: {
    addMovieToList (context, movie) {
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
