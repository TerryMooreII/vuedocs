<template>
  <form @submit.prevent="onSubmit">
    <p class="help has-text-danger" v-if="!user">
      You must be  <router-link :to="{ name: 'login'}">logged in</router-link> to comment.
    </p>
    <div class="field">
      <div class="control">
        <textarea class="textarea is-primary" type="text" placeholder="Comment" v-model="reply.text" :disabled="!user"></textarea>
      </div>
    </div>
    <div class="control">
      <button class="button is-primary" :disabled="!user">Submit</button>
      <button class="button is-link" type="button" @click="$emit('close')" v-if="!showCancel">Cancel</button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'VdCommentAdd',
    props: {
      comment: {
        type: Object,
        required: false
      },
      showCancel: {
        type: Boolean,
        required: false
      }
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    data () {
      return {
        reply: {
          articleId: this.$route.params.id,
          parentId: null,
          text: '',
          author: '',
          posted: Date.now(),
          isDeleted: false
        }
      };
    },
    methods: {
      onSubmit () {
        this.reply.author = this.user._id;

        if (this.comment && this.comment._id) {
          this.reply.parentId = this.comment._id;
        }

        axios.post(`comments`, this.reply).then(response => {
          console.log('comment post response', response.data);
          this.reply.text = '';
          this.$emit('close');
          this.$store.commit(types.COMMENT_ADDED, {comment: response.data});
        });
      }
    }
  };
</script>


<style scoped>

</style>
