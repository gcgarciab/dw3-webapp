<template>
  <h1 v-if="transactionId">Transaction # {{ transactionId }}</h1>
</template>

<script>
export default {
  name: "Transaction",

  data () {
    return {
      transactionId: null
    }
  },

  created() {
    this.transactionId = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
