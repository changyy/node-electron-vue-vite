<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

onMounted(() => {
  const information = document.getElementById('info')
  information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

  // https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
  electronAPI.ping().then(function(data) {
    information.innerText += `, ping (${data})`
  });

});
</script>

<template>
  <header>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </header>
  <HelloWorld msg="hello world" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
