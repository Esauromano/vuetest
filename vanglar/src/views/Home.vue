<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vanglar App"/>
    <button @click="logout">Logout</button>
  </div>
</template>
<style>
  button{
    margin:auto;
  }
  .home{
    display: flex;
    flex-direction: column;
    margin: auto;
    
  }
  img{
      width: 300px;
      height: auto;
      margin: auto;
    }
</style>
<script>
// @ is an alias to /src
import firebase from 'firebase'
export default {
  name: 'Home',
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
