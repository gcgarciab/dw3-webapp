<template>
  <div class="content">
    <section class="login">
      <h1>Login</h1>

      <form class="login-form" @submit.prevent="authenticate()">
        <input
            type="text"
            class="form-control"
            placeholder="Username"
            v-model="username"
        >
        <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
        >
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
<style>

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 350px;
  height: 350px;
  border-radius: 10px;
  border: 1px solid #2c3e50;
  padding: 40px 60px;
  box-sizing: border-box;
}

.login-form input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  margin: 15px 0;
  width: -webkit-fill-available;
}

.form-button {
  margin-top: 30px;
  display: block;
  background: #2c3e50;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}
</style>
