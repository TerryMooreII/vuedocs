<template>
  <div :class="{notification: true, 'is-info': true, 'is-block': !hidden}" v-if="!user">
    <button class="delete" @click="hide" title="Hide this forever!"></button>
    <strong>Welcome!</strong>
    VueNews.io is your one stop site for all Vue.js news, blog posts, the latest components, or anything else Vue.js related.
    Its time to
    <router-link :to="{name: 'register'}">sign Up</router-link>
    and be a part of the latest and greatest JavaScript community!
  </div>
</template>

<script>
  import {mapGetters} from 'Vuex';

  export default {
    name: 'VdWelcomeMessages',
    computed: mapGetters({
      user: 'getUser'
    }),
    data () {
      return {
        hidden: true
      };
    },
    created () {
      if (this.user) {
        this.hide();
      }
      this.hidden = !!localStorage.getItem('welcome-message');
    },
    methods: {
      hide () {
        localStorage.setItem('welcome-message', 'true');
        this.hidden = true;
      }
    }
  };
</script>


<style scoped>
  .notification {
    display: none;
  }
</style>
