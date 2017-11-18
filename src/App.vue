<template>
  <div id="app">
    <header>
      <div class="title">
        <h2>This is where a name/title goes</h2>
      </div>
    </header>
    <Search
      :api="api"
      :keys="keys"></Search>
    <Results></Results>
    <!-- to add -->
    <!-- NewReleases -->
    <!-- my watch list -->
    <WatchList
      :api="api"
      :config="config">
    </WatchList>
    <footer>
      <div>
        <p>
          Copyright &copy; Andrew Piper 2017<br />
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Search from "./components/Search.vue"
import Results from "./components/Results.vue"
import WatchList from "./components/WatchList.vue"
import keys from "../tmdbapi.json"
var axios = require("axios")

export default {
  name: 'app',
  data () {
    return {
      keys: keys.keys,
      api: "https://api.themoviedb.org/3/",
      config: undefined,
    }
  },
  methods: {
    setConfig: function () {
      let c = JSON.parse(localStorage.getItem("movie_list_config"))
      if (c) {
        this.config = c
      } else {
        let vm = this
        console.log('api call - App -> Create -> setConfig')
        axios.get(`${this.api}configuration`, {
            params: {
              api_key: this.keys.v3
            }
          })
          .then((res) => {
            vm.config = res.data
            localStorage.setItem("movie_list_config", JSON.stringify(this.config))
          })
          .catch((res) => console.error(res))
      }
      this.$store.commit("setConfig", this.config)
    },
  },
  created () {
    if (!this.config) {
      this.setConfig()
    }
  },
  components: {
    Search,
    Results,
    WatchList,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
