<template>
  <div class="Login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Login</button>
    <p>You don't have an account? You can <router-link to="/signup">create one</router-link></p>
  </div>
</template>
<style lang="css">
.Login{
  display: flex;
  flex-direction: column;
  max-width: 30vw;
  margin: auto;
}
</style>
<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          () => {
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>