<template>
  <p class="control">
    <router-link :to="{name: 'register'}" class="button is-primary is-outlined" v-if="!user">Sign Up</router-link>
    <router-link :to="{name: 'login'}" class="button is-primary" v-if="!user">Login</router-link>

    <router-link :to="{name: 'add-article'}" class="button is-primary" v-if="user">Add Article</router-link>
    <a href="#" class="button is-primary is-outlined" v-if="user" @click="logout">Logout</a>
  </p>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import Auth from '../services/Auth.js';
  import * as types from '../store/mutation-types';

  export default {
    name: 'VdNavbarMenuItems',
    data () {
      return {};
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
