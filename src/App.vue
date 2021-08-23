<template>
  <header>
    <h1>Banco UN</h1>
    <div v-if="isAuth" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="'/user/' + userId">Profile</router-link> |
      <button class="nav-button" @click="logout()">Logout</button>
    </div>
  </header>

  <router-view @logged="isAuth = true"/>

  <footer>
    <h2>MissionTIC 2022</h2>
  </footer>
</template>

<script>
import gql from 'graphql-tag'

export default {

  data() {
    return {
      isAuth: false,
      userId: null
    }
  },

  created() {
    if (localStorage.getItem('access')) {
      this.isAuth = true
      this.userId = localStorage.getItem('userId')
      this.refreshToken()
    } else {
      this.$router.push({ name: 'UserAuth' })
    }
  },

  methods: {
    async refreshToken() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($token: String!) {
            refreshToken(refresh: $token) {
              access
            }
          }
        `,

        variables: {
          token: localStorage.getItem('refresh')
        }
      })
      .then(result => {
        console.log(result)
      })
      .catch(() => {
        alert("Session expired, login again !")
        this.logout()
      })
    },

    logout() {
      localStorage.clear()
      this.isAuth = false
      this.$router.push({ name: 'UserAuth' })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
}

#nav button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0 0 0 15px;
  background: transparent;
  border: none;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

header, footer {
  background: #2c3e50;
  color: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 0;
  font-size: 20px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

footer h2 {
  margin: 0 auto;
  font-size: 18px;
}

</style>
