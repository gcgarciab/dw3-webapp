<template>
  <div>
    <form @submit.prevent="authenticate" class="login"></form>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {

  name: 'UserAuth',

  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async authenticate() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($authenticationCredentials: CredentialsInput!) {
            authenticate(credentials: $authenticationCredentials) {
              access
              token
            }
          }
        `
      })
    }
  }
}
</script>
<style lang="">
  
</style>