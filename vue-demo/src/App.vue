<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD37s0ZJeXjVUQRhGlO1cKgmGwk0GvbF00",
  authDomain: "mess-auto.firebaseapp.com",
  projectId: "mess-auto",
  storageBucket: "mess-auto.firebasestorage.app",
  messagingSenderId: "324484105269",
  appId: "1:324484105269:web:24f6ce7ea1428397f1dd7c",
  measurementId: "G-10W3S7SNZ4"
};

// Initialize Firebase
initializeApp(firebaseConfig);



// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
getToken(messaging, { vapidKey: 'BH2rCQkMjwmOTRH9jkjykkmx5xUx25cDweLmL6cTlbJznP_nxtivrycwO4ltmlX3TyiHQjGGjJtZJqADYefGtPE' }).then((currentToken) => {
  if (currentToken) {
    console.log("currentToken: ", currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});


</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
