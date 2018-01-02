<template>
  <div class="modal-container">
    <div class="movie">
      <span>{{ movie.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  data () {
    return {
    }
  },
  props: {
    movie: [Object, Array],
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
