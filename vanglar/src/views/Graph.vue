<template>
  <div class="graph">
    <h1>This is an about page</h1>
    <button @click="calldocs">Load data</button>
    <ul id="example-1">
      <li v-for="item in docs" :key="item.answer+item.timestamp">
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
        values: []
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
            var cuenta = {}
            var ver = []
            var fal = []
            snapshot.forEach(function(childSnapshot) {
              var item = childSnapshot.val()
              values[moment(new Date(item.timestamp)).format("Do MMM YYYY")]=[]
              cuenta[moment(new Date(item.timestamp)).format("Do MMM YYYY")]=[]
            });
            console.log(values)
            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val()
                item.key = childSnapshot.key // The 0 there is the key, which sets the date to the epoch
                item.date = moment(new Date(item.timestamp)).format("Do MMM YYYY")

                returnArr.push(item)
                dates.push(moment(new Date(item.timestamp)).format("Do MMM YYYY"))
                values[item.date].push(item.right)
            });
            console.log(values)
            let setDates = new Set(dates)
            this.dates = setDates
            setDates.forEach(function(item) {
              cuenta[item] = [values[item].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).get(true),values[item].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).get(false)]
              ver.push(values[item].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).get(true))
              fal.push(values[item].reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).get(false))
            });
            this.docs = returnArr
            
            this.values = cuenta
            console.log('dates', this.dates.length)
            console.log('values', values.length)

            console.log('cuenta', cuenta)
            this.trues = ver
            this.falses = fal
          }
        )
      }
    }
  }
</script>