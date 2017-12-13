<template>
  <div class="movie-listing">
    <div v-if="type === 'suggestion'" class="suggestion">
      <div class="poster click-details" @click="showMovieDetails(movie)">
        <img :src="buildPosterUrl(movie.poster_path, 1)" :alt="movie.title" />
      </div>
      <div class="info">
        <h3 @click="showMovieDetails(movie)" class="click-details">{{ movie.title }}</h3>
        <span class="release-date">Released {{ movie.release_date }}</span>
        <span ref="dup" class="duplicate">Movie Already On List</span>
        <span class="add-movie-to-list">
          <button @click="addMovieToList(movie, $event)" class="button add">Add Movie</button>
          <div class="loading hidden">
            <div class="spinner">
              <div class="mask">
                <div class="maskedCircle">
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>

    <div v-else-if="type === 'watch_list'">
      <div v-show="!collapsed" class="watch-list">
        <div class="poster">
          <img :src="buildPosterUrl(movie.poster_path, 2)" />
        </div>
        <div class="info">
          <span class="rating">{{ movie.vote_average }}</span>
          <span class="release-date">Released {{ movie.release_date }}</span>
          <span class="overview">{{ movie.overview }}</span>
          <span class="imdb-link">
            <a :href="createIMDBLink(movie)" target="_blank">IMDB</a>
          </span>
          <div class="buttons">
            <span v-if="movie.watched">You watched this movie on {{ movie.watched_on }}</span>
            <span class="remove">
              <button class="button alert" @click="removeMovie(movie)">Remove from List</button>
            </span>
            <span class="watched">
              <button 
                class="button" 
                :class="{ add: !movie.watched }" 
                @click="toggleWatched(movie)">
                Watched
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./Modal.vue"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
var axios = require("axios")

export default {
  name: "movie-listing",
  props: {
    api: String,
    keys: [Object, Array],
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
    }),
    ...mapGetters([
      "getWatchList",
    ])
  },
  methods: {
    buildPosterUrl: function (poster_path, size) {
      let u = this.config.images.base_url
      u += this.config.images.poster_sizes[size]
      u += poster_path
      return u
    },
    createIMDBLink: function (movie) {
      return `http://www.imdb.com/title/${ movie.imdb_id }`
    },
    addMovieToList: function (movie, evt) {
      if (this.getWatchList && this.getWatchList.findIndex((m) => m.id === movie.id) >= 0) {
        this.$refs.dup.style.display = "inline-block"
        return
      }
      let spinner = evt.target.nextElementSibling
      let vm = this
      spinner.style.display = "block"
      axios.get(`${this.api}movie/${movie.id}`, {
        params: {
          api_key: this.keys.v3
        }
      })
      .then((res) => {
        vm.commitMovie(res.data)
        vm.$emit("movieAdded")
        spinner.style.display = "none"
      })
      .catch((res) => console.error(res))
    },
    showMovieDetails: function (movie) {
    },
    ...mapMutations({
      commitMovie: "addMovieToList",
    }),
    ...mapMutations([
      "toggleWatched",
      "removeMovie",
    ])
  },
  components: {
    Modal,
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
.watch-list {
  transition: all 1s;
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
  padding: 5px;
  text-align: left;
}
.info span {
  margin-top: 5px;
}
span.watched,
span.add-movie-to-list {
  padding: 10px;
  align-self: flex-end;
}
.add-movie-to-list {
  position: relative;
}
.click-details {
  cursor: pointer;
}
.duplicate {
  display: none;
}
span.remove {
  padding: 10px;
  margin-top: auto;
}
.buttons {
  margin-top: auto;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
@media screen and (max-width: 480px) {
  .watch-list,
  .suggestion {
    flex-direction: column;
  }
  h3 {
    margin: 0;
  }
  .add-movie-to-list {
    margin: 0 auto;
  }
}
</style>
