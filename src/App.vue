<template>
  <div id="app">

    <nav class="navbar is-transparent has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <router-link :to="{name: 'articles'}" class="navbar-item is-size-4" href="/">
            <!--<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"-->
            <!--width="112" height="28">-->
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
            <p class="control" v-if="user && user.user">
              <router-link :to="{name: 'add-article'}" class="button is-primary is-outlined">Add Article</router-link>
            </p>
          </div>
          <div class="navbar-item">
            <p class="control">
              <a href="#" @click.prevent="login('google')" class="button is-primary" v-if="!user || !user.user">
                Login
              </a>
              <a href="#" @click.prevent="logout()" class="button is-primary is-outlined" v-if="user && user.user">
                Logout
              </a>
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
  import Firebase from 'firebase';
  import { mapGetters } from 'vuex';
  import * as types from './store/mutation-types';

  import Auth from './services/Auth.js';

  export default {
    name: 'app',
    data () {
      return {
      };
    },
    beforeCreate () {
      Firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit(types.SET_USER, {user: user ? user.toJSON() : null});
      });
    },
    methods: {
      login (provider) {
        Auth.signInWithProvider(provider, (error) => {
          if (error) {
            console.log('Login Error', error);
          }
        });
      },
      logout () {
        Auth.logout();
      }
    },
    computed: mapGetters({
      user: 'getUser'
    })
  };
</script>

<style>

  html {
    background-color: rgb(250, 250, 250);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  #app {

  }
</style>
