<template>
  <section>搜索页</section>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    activated() {
      this.setSearchPageIsShowing(true);
    },
    deactivated() {
      this.setSearchPageIsShowing(false);
    },
    methods: {
      ...mapMutations({
        setSearchPageIsShowing: 'SEARCH_PAGE_IS_SHOWING'
      })
    },
    name: 'search'
  };
</script>

<style scoped>

</style>
