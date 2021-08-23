<template>
  <div>
    <section class="login">
      <h1>Login</h1>

      <form class="login-form" @submit.prevent="authenticate()">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="username"
        ><br>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        ><br>
        <button type="submit" class="form-button">Submit</button>
      </form>
    </section>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import jwtDecode from 'jwt-decode'

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
              refresh
            }
          }
        `,

        variables: {
          authenticationCredentials: {
            username: this.username,
            password: this.password
          }
        }
      })
      .then(result => {
        let data = result.data.authenticate
        data.userId = jwtDecode(data.access).user_id.toString().padStart(3, "0")
        this.setUserData(data)
      })
      .catch(() => {
        alert('ERROR: Invalid credentials !!')
      })
    },

    setUserData(data) {
      console.log(data)
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('username', this.username)
      this.$emit('logged')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style lang="">

</style>
