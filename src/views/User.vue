<template>
  <h1>Hi {{ username }}</h1>
</template>

<script>
export default {
  name: "User",

  data() {
    return {
      username: null
    }
  },

  created() {
    this.username = localStorage.getItem('username')
  }
}
</script>

<style scoped>

</style>
