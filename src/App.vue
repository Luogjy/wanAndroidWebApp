<template>
  <div id="app">
    <my-header/>
    <home/>
    <nav-bar/>
  </div>
</template>

<script>
  import MyHeader from './common/component/MyHeader';
  import NavBar from './common/component/NavBar';
  import Home from './components/home/home';

  export default {
    components: {
      MyHeader, NavBar, Home
    }
  };
</script>

<style lang="scss" scoped>
</style>
