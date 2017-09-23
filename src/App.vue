<template>
  <div id="app">

    <vd-navbar></vd-navbar>

    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
    <notifications group="messages" position="top center"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import * as types from './store/mutation-types';
  import VdNavbar from './components/navbar';

  export default {
    name: 'app',
    components: {
      'vd-navbar': VdNavbar
    },
    data () {
      return {

      };
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    created () {
      axios.interceptors.response.use(response => {
        return response;
      }, (error) => {
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
