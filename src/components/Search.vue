<template>
  <div class="movie-search">
    <input v-model="search_query" placeholder="Search Movie Titles" type="text" id="movie-search-input" />
    <div class="movie-search-suggestions">
      <div v-for="movie in suggestions" >
        {{ movie.title }}
      </div>
    </div>
  </div>
</template>

<script>
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
  watch: {
    search_query: function () {
      this.search()
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
              vm.suggestions = res.data.results
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
      qs += "3/search/movie"
      qs += `?api_key=${this.keys.v3}`
      qs += `&query=${this.search_query}`
      console.log(this.keys)
      return qs
    },
  },
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
