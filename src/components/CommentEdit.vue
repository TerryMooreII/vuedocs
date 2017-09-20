<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <div class="control">
        <textarea class="textarea is-primary" type="text" placeholder="Comment" v-model="comment.text" :disabled="!user"></textarea>
      </div>
    </div>
    <div class="control">
      <button class="button is-primary" :disabled="!user">Edit</button>
      <button class="button is-link" type="button" @click="$emit('close')">Cancel</button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'VdCommentEdit',
    props: {
      comment: {
        type: Object,
        required: false
      }
    },
    computed: mapGetters({
      user: 'getUser'
    }),
    data () {
      return {
      };
    },
    methods: {
      onSubmit () {
        axios.put(`comments/${this.comment._id}`, this.comment).then(response => {
          this.$emit('close');
          this.$store.commit(types.COMMENT_ADDED, {comment: response.data});
        });
      }
    }
  };
</script>

<style scoped>

</style>
