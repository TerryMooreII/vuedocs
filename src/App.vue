<template>
  <div id="app">

    <nav class="navbar is-transparent has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <router-link :to="{name: 'articles'}" class="navbar-item is-size-4" href="/">
            <img src="./assets/logo.png" alt="Vue Docs"
            width="28" height="28">
            Vue Docs
          </router-link>

          <div class="navbar-burger burger" data-target="navMenuTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

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
    </nav>

    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import Auth from './services/Auth.js';
  import * as types from './store/mutation-types';

  export default {
    name: 'app',
    data () {
      return {
      };
    },
    methods: {
      logout () {
        Auth.logout().then(() => {
          this.$store.commit(types.SET_USER, {user: null});
        });
      }
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    created () {
      const token = localStorage.getItem('id_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('users/me').then(response => {
          this.$store.commit(types.SET_USER, {user: response.data});
        });
      }
    }
  };
</script>

<style>

  html {
    background-color: rgb(250, 250, 250);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .navbar-brand img {
    margin-right: 5px;
  }

  body {
    font-size: .9rem;
    line-height: 1.2;
  }
</style>
