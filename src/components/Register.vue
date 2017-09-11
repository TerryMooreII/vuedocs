<template>
  <div class="columns">
    <div class="column is-offset-2 is-two-thirds">
      <article class="message is-primary">
        <div class="message-header">
          <p>Register</p>
        </div>
        <div class="message-body">
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
              <button class="button is-primary" :disabled="errors.any()">Submit</button>
              <router-link :to="{ name: 'articles'}" class="button is-default is-outlined">Cancel</router-link>
            </div>

          </form>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'register',
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
      axios.post('/users', this.user).then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>


<style scoped>

</style>
