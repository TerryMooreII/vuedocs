<template>
<nav class="navbar is-transparent has-shadow">
  <div class="container">
    <div class="navbar-brand">
      <router-link :to="{name: 'articles'}" class="navbar-item is-size-4" href="/">
        <img src="../assets/logo.png" :alt="title" width="28" height="28"> {{title}}
      </router-link>
      <div class="navbar-item"><vd-navbar-menu-items class="is-hidden-desktop"></vd-navbar-menu-items></div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <vd-navbar-menu-items></vd-navbar-menu-items>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import VdNavbarMenuItems from './NavbarMenuItems.vue';

export default {
  name: 'VdNavbar',
  components: {
    'vd-navbar-menu-items': VdNavbarMenuItems
  },
  data () {
    return {
      title: 'Vue News'
    };
  }
};
</script>


<style scoped>
  nav {
    position:fixed;
    width: 100%;
    background-color: white;
    z-index: 1000;
  }
  .navbar-brand {
    overflow-x: inherit;
    overflow-y: inherit;
  }
</style>
