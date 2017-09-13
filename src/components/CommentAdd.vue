<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <div class="control">
        <textarea class="textarea is-primary" type="text" placeholder="Comment" v-model="reply.text"></textarea>
      </div>
    </div>
    <div class="control">
      <button class="button is-primary">Submit</button>
      <button class="button is-link" type="button">Cancel</button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex';

  export default {
    name: 'VdCommentAdd',
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
        reply: {
          articleId: this.$route.params.id,
          text: '',
          submittedBy: '',
          submittedDate: Date.now(),
          isDeleted: false,
          replies: []
        }
      };
    },
    methods: {
      onSubmit () {
        if (!this.comment) {
          axios.post(`comments`, this.reply).then(response => {
            console.log('Saved root leve;');
          });
        } else {
          let comment = Object.assign({}, this.comment);
          if (!comment.replies || !Array.isArray(comment.replies)) {
            comment = {replies: []};
          }

          comment.replies.push(this.reply);

          axios.put(`comments/${comment._id}`, comment).then(response => {
            console.log('saved');
          });
        }
      }
    },
    mounted () {
      console.log('Mounted with comment', this.comment);
    }
  };
</script>


<style scoped>

</style>
