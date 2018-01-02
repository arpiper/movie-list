<template>
  <div class="new-releases">
    <div class="slide-left chevron left" @click="slideLeft()"></div>
    <div class="mask">
      <div class="new-releases-list" ref="nrl">
        <MovieListing
          v-for="(movie,index) in new_releases"
          @movieSelected="selectMovie(movie)"
          :key="index"
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
      let x = parseInt(this.$refs.nrl.style.transform.split("(")[1])
      if (Math.abs(x) >= (this.$refs.nrl.scrollWidth - this.$refs.nrl.offsetWidth)) {
        return
      }
      if (!x) {
        x = `translateX(-150px)`
      } else {
        x = `translate(${x - 150}px)`
      }
      this.$refs.nrl.style.transform = x
    },
    slideLeft: function () {
      let x = parseInt(this.$refs.nrl.style.transform.split("(")[1])
      if (!x) {
        return
      } else {
        x = `translate(${x + 150}px)`
        this.$refs.nrl.style.transform = x
      }
    },
    selectMovie: function (movie) {
      this.$emit("movieSelected", movie)
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
  flex: 1 0 150px;
}
</style>
