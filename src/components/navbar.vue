<template>
<nav class="navbar is-transparent has-shadow">
  <div class="container">
    <div class="navbar-brand">
      <router-link :to="{name: 'articles'}" class="navbar-item is-size-4" href="/">
        <img src="../assets/logo.png" :alt="title" width="28" height="28"> {{title}}
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <p class="control">
            <router-link :to="{name: 'register'}" class="button is-primary is-outlined" v-if="!user">Register</router-link>
            <router-link :to="{name: 'login'}" class="button is-primary" v-if="!user">Login</router-link>

            <router-link :to="{name: 'add-article'}" class="button is-primary is-outlined" v-if="user">Add Article</router-link>
            <a href="#" class="button is-primary" v-if="user" @click="logout">Logout</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Auth from '../services/Auth.js';
import * as types from '../store/mutation-types';

export default {
  name: 'VdNavbar',
  data () {
    return {
      title: 'Vue Docs'
    };
  },
  methods: {
    logout () {
      Auth.logout().then(() => {
        this.$store.commit(types.SET_USER, {
          user: null
        });
      });
    }
  },
  computed: mapGetters({
    user: 'getUser'
  })
};
</script>


<style scoped>

</style>
