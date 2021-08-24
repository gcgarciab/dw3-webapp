<template>
  <section v-if="accountByUserId.balance" class="user-account">
    <h1>Hi {{ username }}</h1>
    <hr>
    <h2>Balance: ${{ accountByUserId.balance }}</h2>
    <hr>
    <h2>Date last change: {{ accountByUserId.lastChange.substring(0, 10) }}</h2>
    <hr>
    <h2>Hour last change: {{ accountByUserId.lastChange.substring(11, 19) }}</h2>
  </section>

</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "User",

  data() {
    return {
      username: null,
      accountByUserId: {
        balance: null,
        lastChange: null
      }
    }
  },

  created() {
    this.username = localStorage.getItem('username')
  },

  apollo: {
    accountByUserId: {
      query: gql`
        query ($userId: String!) {
          accountByUserId(userId: $userId) {
            balance
            lastChange
          }
        }
      `,

      variables: {
        userId: localStorage.getItem('userId')
      }
    }
  }
}
</script>

<style scoped>

</style>
