<template>
  <div class="movie-search">
    <input ref="searchBox" v-model="search_query" placeholder="Search Movie Titles" type="text" id="movie-search-input" />
    <span 
      class="search-icon magnifying-glass" 
      :class="{ hide: suggestions}"
      @click="search()">
    </span>
    <span 
      class="clear-icon cross-x" 
      :class="{ hide: !suggestions }"
      @click="clearSearch()">
    </span>
    <div class="movie-search-suggestions" ref="suggestions">
      <div v-for="movie in suggestions" class="movie-suggestion">
        <MovieListing
          @movieAdded="clearSearch()"
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
      suggestions: undefined
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  watch: {
    search_query: function () {
      this.autoSearch()
      if (this.search_query.length === 0) {
        this.suggestions = undefined
      }
    }
  },
  methods: {
    autoSearch: _.debounce(
      function () {
        if (this.search_query.length > 3) {
          this.search() 
        }
      },
      1000 // wait 1000 milliseconds for user to stop typing.
    ),
    search: function () {
      let vm = this
      let query = this.buildQueryString()
      axios.get(query)
        .then(function (res) {
          vm.suggestions = res.data.results.slice(0,5)
          vm.suggestionsHeight()
        })
        .catch(function (res) {
          vm.suggestions = ['No results found.']
        })
    },
    clearSearch: function () {
      this.search_query = ""
      this.suggestions = undefined
      this.$refs.suggestions.style.height = ""
    },
    buildQueryString: function () {
      let qs = this.api
      qs += "search/movie"
      qs += `?api_key=${this.keys.v3}`
      qs += `&query=${this.search_query}`
      return qs
    },
    suggestionsHeight: function () {
      let sb = window.getComputedStyle(this.$refs.searchBox).height
      let h = window.getComputedStyle(this.$parent.$refs.header).height
      this.$refs.suggestions.style.height = `calc(100vh - ${sb} - ${h})`
    },
  },
  created () {
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
  position: relative;
  background-color: #eee;
}
.movie-search-suggestions {
  position: absolute;
  z-index: 100;
  width: 100%;
  overflow-y: scroll;
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
.search-icon,
.clear-icon {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
.clear-icon {
  top: 8px;
}
.hide {
  display: none;
}
</style>
