<template>
  <div class="columns is-desktop">
    <div class="column has-text-centered">
      <button class="button is-social is-twitter" type="button" v-on:click="oauthLogin('twitter')">
        <i class="fa fa-twitter"></i>   
        Twitter Login
      </button>
    </div>
    <div class="column has-text-centered">
      <button class="button is-social is-google" type="button" v-on:click="oauthLogin('google')">
        <i class="fa fa-google"></i>     
        Google Login
      </button>
    </div>
    <div class="column has-text-centered">
      <button class="button is-social is-github" type="button" v-on:click="oauthLogin('github')">
        <i class="fa fa-github"></i>   
        Github Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vdSocialLogin',
  methods: {
    oauthLogin (provider) {
      const api = process.env.API_URL;
      window.location.href = `${api}oauth/${provider}`;
    }
  }
};
</script>

<style scoped>
  .columns {
    margin-top: 15px;
  }
  .is-social {
    color: white;
    padding-right: 30px;
  }
  .is-social i {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #eee;
    display: inline-block;
  }

  .is-github {
    background-color: #444444;
  }
  .is-google {
    background-color: #dd4b39
  }
  .is-twitter {
    background-color: #55acee;
  }
  
</style>
