<template>
  <div class="movie-search">
    <input v-model="search_query" placeholder="Search Movie Titles" type="text" id="movie-search-input" />
    <div class="movie-search-suggestions">
      <div v-for="movie in suggestions" class="movie-suggestion">
        <MovieListing
          :movie="movie"
          type="suggestion">
        </MovieListing>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListing from "./MovieListing"
import { mapState } from "vuex"
var _ = require("lodash")
var axios = require("axios")

export default {
  name: "search",
  props: {
    api: [String, Object, Array],
    keys: [String, Object, Array],
  },
  data () {
    return {
      search_query: "",
      suggestions: []
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  watch: {
    search_query: function () {
      this.search()
      let s = JSON.parse(localStorage.getItem("dev_items"))
      if (s) {
        this.suggestions = s
      } else {
        localStorage.setItem("dev_items", JSON.stringify(this.suggestions))
      }
    }
  },
  methods: {
    search: _.debounce(
      function () {
        if (this.search_query.length > 3) {
          let vm = this
          let query = this.buildQueryString()
          axios.get(query)
            .then(function (res) {
              vm.suggestions = res.data.results.slice(0,5)
            })
            .catch(function (res) {
              vm.suggestions = ['No results found.']
            })
        }
      },
      1000 // wait 1000 milliseconds for user to stop typing.
    ),
    buildQueryString: function () {
      let qs = this.api
      qs += "search/movie"
      qs += `?api_key=${this.keys.v3}`
      qs += `&query=${this.search_query}`
      console.log(this.keys)
      return qs
    },
  },
  components: {
    MovieListing
  }
}
</script>

<style scoped>
.movie-search {
  width: 80%;
  margin: 0 auto;
}
#movie-search-input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  border: 2px solid #999;
}
</style>
