<template>
  <div class="graph">
    <h1>This is an about page</h1>
    <button @click="load">Login</button>
  </div>
</template>
<script>
import firebase from 'firebase'
const db = firebase
  .initializeApp({ databaseURL: 'https://vanglar-fa637.firebaseio.com/' })
  .database()
  export default {
    name: 'graph',
    methods: {
      load: function() {
        // retrieve a collection
        db.ref('anglar-fa637').once('value', snapshot => {
          const docs = snapshot.val()
          // do something with documents
          console.log(docs)
        })
      }
    }
  }
</script>