<template>
  <div id="app">
    <my-header/>
    <nav-bar/>
  </div>
</template>

<script>
  import MyHeader from './common/component/MyHeader';
  import NavBar from './common/component/NavBar';

  export default {
    components: {
      MyHeader, NavBar
    }
  };
</script>

<style lang="scss" scoped>
</style>
