<template>
  <div class="new-releases">
    <div class="slide-left chevron left" @click="slideLeft()"></div>
    <div class="mask">
      <div class="new-releases-list" ref="new_releases_list">
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
    <div class="slide-right chevron right" @click="slideRight()"></div>
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
      q += `&sort_by=primary_release_date.asc`
      q += `&primary_release_date.gte=${d1}`
      q += `&primary_release_date.lte=${d2}`
      console.log(q)
      return q
    },
    slideRight: function () {
      console.log(this.$refs.new_releases_list)
      let x = this.$refs.new_releases_list.style.transform
      console.log(x)
      if (!x) {
        x = `translateX(-200px)`
      } else {
        x = parseInt(x.split("(")[1])
        x = `translate(${x - 200}px)`
      }
      this.$refs.new_releases_list.style.transform = x
    },
    slideLeft: function () {
      let e = this.$refs.new_releases_list
      if (!e.style.transform || e.scrollWidth) {
        return
      } else {
        x = parseInt(x.split("(")[1])
        x = `translate(${x + 200}px)`
      }
      this.$refs.new_releases_list.style.transform = x
    },
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
  width: 100%
}
.mask {
  overflow: hidden;
  width: 100%;
}
.new-releases,
.new-releases-list {
  margin: 0 auto;
  display: flex;
}
.new-releases-list {
  position: relative;
  transition: 1s transform;
}
.slide-left, 
.slide-right {
  flex: 0 0 5%;
  display: flex;
  align-items: center;
  opacity: 0;
  justify-content: center;
}
.slide-left:hover,
.slide-right:hover {
  background-color: rgba(0,0,0,.1);
  cursor: pointer;
  opacity: 1;
}
.movie-listing {
  flex: 1 0 200px;
}
</style>
