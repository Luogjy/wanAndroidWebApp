<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="test">测试</div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    .test {
      color: red;
      font-size: 16px;
    }
  }
</style>
