<template>
  <div class="movie-listing">
    <div v-if="type === 'suggestion'" class="suggestion">
      <div class="poster">
        <img :src="buildPosterUrl(movie.poster_path)" :alt="movie.title" />
      </div>
      <div class="info">
        <h3>{{ movie.title }}</h3>
        <span class="release-date">{{ movie.release_date }}</span>
      </div>
    </div>
    <div v-else-if="type === 'modal'" class="movie-container">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "movie-listing",
  props: {
    type: String,
    movie: [Object, Array],
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
    buildPosterUrl: function (poster_path) {
      let u = this.config.images.base_url
      u += this.config.images.poster_sizes[1]
      u += poster_path
      return u
    },
  }
}
</script>

<style scoped>
.suggestion {
  background-color: #bbb;
  color: #323232;
  width: 100%;
  height: auto;
  display: flex;
  padding: 10px;
}
.suggestion div {
  padding: 0 10px;
}
.suggestion .poster {
}
.suggestion .infor {
}
</style>
