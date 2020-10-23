<template>
  <div class="SignUp">
    <h3>Sign Up</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signup">SignUp</button>
    <p>You have an account? You can <router-link to="/login">Login</router-link></p>
  </div>
</template>
<style lang="css">
.SignUp{
  display: flex;
  flex-direction: column;
  max-width: 30vw;
  margin: auto;
}
</style>
<script>
  import firebase from 'firebase';
  export default {
    name: 'signup',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signup: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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