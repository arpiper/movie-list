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
      // movie.collapsed = true
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
    toggleWatched (state, movie, index) {
      let wl = JSON.parse(state.watchList)
      let i = wl.findIndex((mov) => mov.id === movie.id)
      movie.watched = !movie.watched
      if (movie.watched) {
        movie.watched_on = new Date().toDateString()
      }
      wl[i] = movie
      state.watchList = JSON.stringify(wl)
      localStorage.setItem("movie_watch_list", JSON.stringify(wl))
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
