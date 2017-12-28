<template>
  <div class="new-releases">
    <div v-for="movie in new_releases">
      <span class="title">{{ movie.title }}</span>
    </div>
  </div>
</template>

<script>
var axios = require("axios") 

export default {
  name: "new-releases",
  data () {
    return {
      new_releases: undefined,
    }
  },
  props: {
    api: [Object, Array, String],
    keys: [Object, Array],
  },
  methods: {
    getNewReleases: function () {
      let d = new Date()
      let q = this.api + "/discover/movie"
      q += `${this.keys.v3}`
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
