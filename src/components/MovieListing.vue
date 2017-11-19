<template>
  <div class="movie-listing">
    <div v-if="type === 'suggestion'" class="suggestion">
      <div class="poster">
        <img :src="buildPosterUrl(movie.poster_path, 1)" :alt="movie.title" />
      </div>
      <div class="info">
        <h3>{{ movie.title }}</h3>
        <span class="release-date">Released {{ movie.release_date }}</span>

        <span class="add-movie-to-list">
          <button @click="addMovieToList(movie)" class="button add">Add Movie</button>
        </span>
      </div>
    </div>

    <div v-else-if="type === 'modal'" class="movie-container">
    </div>

    <div v-else-if="type === 'watch_list'">
      <div v-show="!collapsed" class="watch-list">
        <div class="poster">
          <img :src="buildPosterUrl(movie.poster_path, 3)" />
        </div>
        <div class="info">
          <span class="rating">{{ movie.vote_average }}</span>
          <span class="release-date">Released {{ movie.release_date }}</span>
          <span class="overview">{{ movie.overview }}</span>
          <span class="watched">
            <button class="button add">Watched</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: "movie-listing",
  props: {
    type: String,
    movie: [Object, Array],
    collapsed: Boolean,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  methods: {
    buildPosterUrl: function (poster_path, size) {
      let u = this.config.images.base_url
      u += this.config.images.poster_sizes[size]
      u += poster_path
      return u
    },
    addMovie: {
    },
    ...mapMutations([
      'addMovieToList',
    ])
  }
}
</script>

<style scoped>
.suggestion,
.watch-list {
  background-color: #dedede;
  color: #323232;
  width: 100%;
  height: auto;
  display: flex;
  padding: 10px;
  flex: 1;
  width: 100%;
}
.suggestion div {
  padding: 0 10px;
}
.poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  flex: 1;
}
.watched,
.add-movie-to-list {
  padding: 10px;
  align-self: flex-end;
  margin-top: auto;
}
</style>
