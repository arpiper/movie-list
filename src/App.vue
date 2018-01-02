<template>
  <div id="app">
    <header ref="header">
      <div class="title">
        <h2>Movie Watch List</h2>
      </div>
    </header>
    <NewReleases @movieSelected="showMovie($event)"></NewReleases>
    <Search
      :api="api"
      :keys="keys"></Search>
    <Results></Results>
    <!-- to add -->
    <!-- NewReleases -->
    <!-- my watch list -->
    <WatchList
      :api="api">
    </WatchList>
    <Modal v-if="selected_movie" :movie="selected_movie"></Modal>
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
import NewReleases from "./components/NewReleases.vue"
import Modal from "./components/Modal.vue"
import keys from "../tmdbapi.json"
var axios = require("axios")

export default {
  name: 'app',
  data () {
    return {
      keys: keys.keys,
      api: "https://api.themoviedb.org/3/",
      config: undefined,
      selected_movie: undefined,
    }
  },
  methods: {
    setConfig: function () {
      let c = JSON.parse(localStorage.getItem("movie_list_config"))
      if (c) {
        this.config = c
        this.$store.commit("setConfig", c)
      } else {
        let vm = this
        axios.get(`${this.api}configuration`, {
            params: {
              api_key: this.keys.v3
            }
          })
          .then((res) => {
            vm.config = res.data
            localStorage.setItem("movie_list_config", JSON.stringify(vm.config))
            vm.$store.commit("setConfig", vm.config)
          })
          .catch((res) => console.error(res))
      }
      this.$store.commit("setApi", this.api)
      this.$store.commit("setKeys", this.keys)
    },
    showMovie: function (movie) {
      this.selected_movie = movie
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
    NewReleases,
    Modal,
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #eee;
  min-height: 100%;
  width: 80%;
  margin: 0 auto;
}
header,
footer {
}
header {
  height: 70px;
  display:flex;
  justify-content: center;
  align-items: center;
}
h1, h2 {
  margin: 0;
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
@media screen and (max-width: 480px) {
  #app {
    width: 100%;
  }
}
</style>
