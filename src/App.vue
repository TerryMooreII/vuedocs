<template>
  <div id="app">

    <vd-navbar></vd-navbar>

    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
    <notifications group="messages" position="top center"></notifications>
    <vd-footer></vd-footer>
    <vd-loading></vd-loading>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import * as types from './store/mutation-types';
  import VdNavbar from './components/Navbar';
  import VdFooter from './components/Footer';
  import VdLoading from './components/Loading.vue';

  export default {
    name: 'app',
    components: {
      VdFooter,
      'vd-navbar': VdNavbar,
      'vd-footer': VdFooter,
      'vd-loading': VdLoading
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    created () {
      // This needs refactored
      let count = 0;
      axios.interceptors.request.use((config) => {
        count++;

        setTimeout(() => {
          if (count > 0) {
            this.$store.commit(types.LOADING, {isLoading: true});
          }
        }, 1000);

        return config;
      }, (error) => {
        this.$store.commit(types.LOADING, {isLoading: false});
        return Promise.reject(error);
      });

      axios.interceptors.response.use(response => {
        count--;
        if (count >= 0) {
          this.$store.commit(types.LOADING, {isLoading: false});
        }

        return response;
      }, (error) => {
        count--;
        this.$store.commit(types.LOADING, {isLoading: false});

        this.$notify({
          group: 'messages',
          title: 'Error',
          type: 'error',
          text: error.response.data.message || 'Unexpected Error'
        });
        return Promise.reject(error);
      });

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
