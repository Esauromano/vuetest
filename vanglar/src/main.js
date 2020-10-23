import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyBsz3UiyxdDM2V12WedakRWEmC3Oy-wVJg",
  authDomain: "vanglar-fa637.firebaseapp.com",
  databaseURL: "https://vanglar-fa637.firebaseio.com",
  projectId: "vanglar-fa637",
  storageBucket: "vanglar-fa637.appspot.com",
  messagingSenderId: "928614680684",
  appId: "1:928614680684:web:388c7e080da898dc253049"
}

firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
