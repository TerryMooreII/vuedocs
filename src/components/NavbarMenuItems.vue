<template>
  <div class="control">
    <router-link :to="{name: 'register'}" class="button is-primary is-outlined" v-if="!user">Sign Up</router-link>
    <router-link :to="{name: 'login'}" class="button is-primary" v-if="!user">Login</router-link>

    <router-link :to="{name: 'add-article'}" class="button is-primary" v-if="user">Add Article</router-link>

    <div class="dropdown is-hoverable is-right" v-if="user">
      <div class="dropdown-trigger">
        <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
          <span class="is-hidden-mobile">{{user.displayName || user.username}}</span>
          <img class="image is-24x22 round" v-bind:src="user.profileImage" v-if="user.profileImage"/>
          <div class="inital is-24x22 round" v-if="!user.profileImage">{{firstInitial()}}</div>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <router-link :to="{name: 'profile'}" class="dropdown-item">
            <i class="fa fa-fw fa-user"></i>
            Manage Profile
          </router-link>
          <hr class="dropdown-divider">
          <a href="#" class="dropdown-item" @click="logout">
            <i class="fa fa-fw fa-sign-out"></i>
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
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
      },
      firstInitial () {
        if (this.user.username) {
          return this.user.username[0].toUpperCase();
        }
        return 'X';
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    }
  };
</script>


<style scoped>
.image, .inital {
  margin-left: 5px;
  border: 1px solid #aaa;
}
.inital{
  padding: 0 7px;
}
.round {
  border-radius: 50%;
}
</style>
