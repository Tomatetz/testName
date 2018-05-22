<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'vue-awesome/icons';
import List from './components/list.vue';

export default {
  name: 'app',
  components: {
    List
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
