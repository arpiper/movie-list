<template>
  <div class="modal-container">
    <MovieListing
      @setSize="setPosition($event)"
      @close="closeModal()"
      @movieAdded="closeModal()"
      :movie="movie_full_details"
      refs="ml"
      :style="style_obj"
      type="modal">
    </MovieListing>
  </div>
</template>

<script>
import MovieListing from "./MovieListing.vue"
import { mapState } from "vuex"
let axios = require("axios")

export default {
  name: "modal",
  data () {
    return {
      style_obj: {
        top: 0,
        left: 0,
      },
      movie_full_details: undefined
    }
  },
  props: {
    movie: [Number, String, Object, Array],
  },
  computed: {
    ...mapState({
      api: state => state.api,
      keys: state => state.keys
    })
  },
  methods: {
    getMovieDetails: function () {
      this.movie_full_details = this.movie
      let vm = this
      axios.get(`${this.api}movie/${this.movie.id}`, {
        params: {
          api_key: this.keys.v3
        }
      })
      .then( res => {
        vm.movie_full_movie = res.data
      })
      .catch( res => {
        console.error(res)
      })
    },
    setPosition: function (evt) {
      this.style_obj.top = `calc(50% - ${evt.h / 2}px)`
      this.style_obj.left = `calc(50% - ${evt.w / 2}px)`
    },
    closeModal: function () {
      this.$emit("closeModal")
    },
  },
  created () {
    this.getMovieDetails()
  },
  mounted () {
  },
  components: {
    MovieListing,
  }
}
</script>

<style scoped>
.modal-container {
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container .movie-listing {
  position: absolute;
  width: 75%;
}
</style>
