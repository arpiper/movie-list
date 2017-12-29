<template>
  <div class="new-releases">
    <div>
      <MovieListing
        v-for="(movie,index) in new_releases"
        :key="index"
        :api="api"
        :keys="keys"
        :movie="movie"
        type="new_release">
      </MovieListing>
    </div>
  </div>
</template>

<script>
import MovieListing from "./MovieListing.vue"
import { mapState } from "vuex"
var axios = require("axios") 

export default {
  name: "new-releases",
  data () {
    return {
      new_releases: undefined,
    }
  },
  props: {
  },
  computed: {
    ...mapState({
      api: state => state.api,
      keys: state => state.keys,
    })
  },
  methods: {
    getNewReleases: function () {
      let q = this.buildQuery()
      let vm = this
      axios.get(q)
        .then((res) => {
          vm.new_releases = res.data.results
        })
        .catch((res) => {
          console.error(res)
        })
    },
    buildQuery: function () {
      let d = new Date()
      let d1 = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      let t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)
      let d2 = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
      let q = this.api + "discover/movie"
      q += `?api_key=${this.keys.v3}&include_adult=false&language=en-US&region=US`
      q += `&primary_release_date.gte=${d1}`
      q += `&primary_release_date.lte=${d2}`
      console.log(q)
      return q
    },
    posterUrl: function() {
    }
  },
  created () {
    this.getNewReleases();
  },
  components: {
    MovieListing
  }
}
</script>

<style scoped>
.new-releases {
  padding: 0 40px;
}
.new-releases,
.new-releases div {
  width: 90%;
  margin: 0 auto;
  display: flex;
}
.new-releases div {
  overflow: hidden;
}
</style>
