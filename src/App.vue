<template>
  <ChatBot></ChatBot>

</template>

<script>
import ChatBot from './components/ChatBot.vue';

export default {
  name: 'App',
  components: {
    ChatBot
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
  margin-top: 5px;
}
</style>
