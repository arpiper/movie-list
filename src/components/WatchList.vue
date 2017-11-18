<template>
  <div class="my-watch-list">
    <h2>Watch List</h2>
    <div>
      <div v-for="(movie, index) in getWatchList">
        <div>
          <div class="movie-listing-collapsed">
            <span class="title">{{ movie.title }}</span>
            <span class="watched checkmark"></span>
            <span class="chevron" @click="toggleMovie(evt, index)"></span>
          </div>
          <MovieListing
            :movie="movie"
            :collapsed="movie.collapsed"
            type="watch_list">
          </MovieListing>
        </div>
      </div>
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
    toggleMovie: function (evt, index) {
      this.$store.commit('showMovie',index)
    },
    ...mapMutations({
      showMovie: 'toggleMovie',
    })
  },
  components: {
    MovieListing,
  },
}
</script>

<style scoped>
.my-watch-list {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  position: relative;
  background-color: #dedede;
  flex: 1;
}
.movie-listing-collapsed {
  width: 100%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.movie-listing-collapsed .title {
  font-size: 18px;
  font-weight: bold;
}
.movie-listing-collapsed .chevron {
  margin-left: auto;
}
</style>
