<template>
  <div class="columns">
    <div class="column is-offset-2 is-two-thirds">
      <article class="message is-primary">
        <div class="message-header">
          <p>Sign Up</p>
        </div>
        <div class="message-body">
          <vd-social-login /> 
          <hr>
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-right">
                <input :class="{'input': true, 'is-danger': errors.has('username'), 'is-success': !errors.has('username') && fields.username && fields.username.touched }"
                       type="text" name="username" placeholder="Username" v-model="user.username" v-validate="'required'">
                <span class="icon is-small is-right" v-show="!errors.has('username') && fields.username && fields.username.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</p>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-right">
                <input :class="{'input': true, 'is-danger': errors.has('email'), 'is-success': !errors.has('email') && fields.email && fields.email.touched }"
                       type="email" name="email" placeholder="Email Address" v-model="user.email" v-validate="'required|email'">
                <span class="icon is-small is-right" v-show="!errors.has('email') && fields.email && fields.email.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</p>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-right">
                <input :class="{'input': true, 'is-danger': errors.has('password'), 'is-success': !errors.has('password') && fields.password && fields.password.touched }"
                       type="password" name="password" placeholder="Password" v-model="user.password" v-validate="'required'">
                <span class="icon is-small is-right" v-show="!errors.has('password') && fields.password && fields.password.touched">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</p>
            </div>

            
            <div class="field">
              <vue-recaptcha 
                sitekey="6LeGYksUAAAAAGxvtp7mTBInOcaWGwXQYgzkIRSt"
                ref="recaptcha"
                @verify="onVerify">
                <button class="button is-primary" :disabled="errors.any()">Submit</button>
                <router-link :to="{ name: 'articles'}" class="button is-default is-outlined">Cancel</router-link>
              </vue-recaptcha>
              
            </div>

          </form>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';

import VdSocialLogin from './SocialLogin';
import Auth from '../services/Auth';
import * as types from '../store/mutation-types';

export default {
  name: 'VdRegister',
  components: {
    'vd-social-login': VdSocialLogin,
    VueRecaptcha
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit () {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify (response) {
      axios.post('/users', this.user).then(() => {
        Auth.login({
          username: this.user.username,
          password: this.user.password
        }).then((response) => {
          this.$store.commit(types.SET_USER, {user: response.user});
          this.$router.push('/');
        });
      }).catch(() => this.$refs.recaptcha.reset());
    }
  }
};
</script>


<style scoped>

</style>
