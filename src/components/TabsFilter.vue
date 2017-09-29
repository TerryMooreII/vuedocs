<template>
  <div class="tabs is-centered">
    <ul>
      <li><router-link :to="{name:'articles'}">Top</router-link></li>
      <li><router-link :to="{name:'articles', query: {orderby: 'recent'}}">Recent</router-link></li>
      <!--<li><router-link :to="{name:'articles'}">Comments</router-link></li>-->
      <!--<li><router-link :to="{name:'articles'}">Search</router-link></li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VdTabsFilter'
};
</script>


<style scoped>
  .router-link-exact-active {
    border-bottom-color: #00d1b2;
    color: #00d1b2;
  }
</style>
