<template>
  <div class="my-watch-list">
    <h2>Watch List</h2>
    <div v-for="(movie, index) in getWatchList" :id="movie.id">
      <div class="movie-listing-bar">
        <span class="title">{{ movie.title }}</span>
        <span class="checkmark" :class="{ watched: movie.watched }" @click="watched(movie)"></span>
        <span class="chevron" @click="toggleMovie($event)"></span>
      </div>
      <MovieListing
        class="watch-list-movie-listing"
        :movie="movie"
        type="watch_list">
      </MovieListing>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import MovieListing from "./MovieListing.vue"

export default {
  name: "watch-list",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getWatchList',
    ]),
  },
  methods: {
    toggleMovie: function (evt) {
      let el = evt.target.parentElement.nextElementSibling
      el.classList.toggle("show")
      evt.target.classList.toggle("up")
    },
    watched: function (movie) {
      this.toggleWatched(movie)
    },
    ...mapMutations({
      showMovie: 'toggleMovie',
    }),
    ...mapMutations([
      "toggleWatched"
    ])
  },
  components: {
    MovieListing,
  },
}
</script>

<style>
.my-watch-list {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  position: relative;
  background-color: #eee;
  flex: 1;
}
.my-watch-list h2 {
  margin: 0;
}
.watch-list-movie-listing.movie-listing {
  height: 0;
  overflow: hidden;
  transition: all 1s;
}
.watch-list-movie-listing.show {
  height: 298px;
}
.movie-listing-bar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.movie-listing-bar .title {
  font-size: 18px;
  font-weight: bold;
}
.movie-listing-bar .chevron {
  margin-left: auto;
}
</style>
