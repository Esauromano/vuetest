<template>
  <div class="graph">
    <h1>This is an about page</h1>
    <button @click="calldocs">Load data</button>
    <ul id="example-1">
      <li v-for="item in trues" :key="item.answer+item.timestamp">
        {{ item.right }} - {{ item.date }}
      </li>
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase'
import moment from 'moment'
const db = firebase.database()
  export default {
    name: 'Graph',
    data() {
      return {
        docs: {},
        falses: [],
        trues:[],
        dates: [],
        values: {}
      }
    },
    firebase: {
      docs: {
        source: db.ref('answers'),
        // Optional, allows you to handle any errors.
        cancelCallback(err) {
          console.error(err);
        }
      }
    },
    methods: {
      calldocs: function() {
        db.ref("answers").once(
          'value', snapshot => {
            var returnArr = []
            var dates = []
            var values = []
            var cuenta = []
            snapshot.forEach(function(childSnapshot) {
              var item = childSnapshot.val()
              values[new Date(item.timestamp)]=[]
            });
            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val()
                item.key = childSnapshot.key // The 0 there is the key, which sets the date to the epoch
                item.date = moment(new Date(item.timestamp)).format("Do MMM YYYY")

                returnArr.push(item)
                dates.push(new Date(item.timestamp))
                values[new Date(item.timestamp)].push(item.right)
            });
            snapshot.forEach(function(childSnapshot) {
              var item = childSnapshot.val()
              
              cuenta.push(values[new Date(item.timestamp)].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))
              
            });
            this.docs = returnArr
            this.dates = new Set(dates)
            console.log('dates', dates.length)
            console.log('dates this', this.dates.length)
            console.log('values', values.length)
            console.log('values this', this.values.length)

            console.log('cuenta', cuenta.length)
            this.trues = returnArr.filter(
              x=>x.right === true
            )
            this.falses = returnArr.filter(
              x=>x.right === false
            )
          }
        )
      }
    }
  }
</script>