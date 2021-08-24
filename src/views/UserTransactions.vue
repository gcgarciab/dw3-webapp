<template>
  <section class="create">
    <h1>Create transaction</h1>
    <hr>
    <form class="login-form" @submit.prevent="createTransaction()">
      <input
        type="text"
        class="form-control"
        placeholder="UserID Destiny"
        v-model="userIdDestiny"
      ><br>
      <input
        type="number"
        class="form-control"
        placeholder="Value"
        v-model="value"
      ><br>
      <button type="submit" class="form-button">Send</button>
    </form>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "UserTransactions",

  data() {
    return {
      userIdDestiny: '',
      userIdOrigin: '',
      value: 0
    }
  },

  methods: {
    async createTransaction() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($transactionInput: TransactionInput!) {
            createTransaction(transaction: $transactionInput) {
              id
              userIdOrigin
              userIdDestiny
              value
              date
            }
          }
        `,

        variables: {
          transactionInput: {
            userIdOrigin: localStorage.getItem('userId') || '',
            userIdDestiny: this.userIdDestiny,
            value: this.value
          }
        }
      })
      .then(result => {
        console.log(result)
        alert('Transaction successful, see history!')
        this.$router.push({ name: 'UserHistory' })
      })
      .catch(() => {
        alert("You don't have money !!")
      })
    }
  }
}
</script>

<style scoped>

</style>
