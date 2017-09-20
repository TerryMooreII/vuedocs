<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.author.username}}</strong>
          <small>{{comment.posted | timeago}}</small>
          <small v-if="comment.isEdited" class="has-text-grey">(Edited)</small>
          <br>
          <span v-if="!isEditing">{{comment.text}}</span>
          <vd-comment-edit :comment="comment" v-if="isEditing" v-on:close="isEditing = false"></vd-comment-edit>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" @click="reply = !reply">
            <span class="icon is-small"><i class="fa fa-reply"></i></span>&nbspReply
          </a>
          <a class="level-item" @click="permalink()">
            <span class="icon is-small"><i class="fa fa-link"></i></span>&nbspPermalink
          </a>
          <a class="level-item" v-if="this.user && this.user._id === this.comment.author._id" @click="isEditing = !isEditing">
            <span class="icon is-small"><i class="fa fa-pencil"></i></span>&nbspEdit
          </a>
        </div>
      </nav>
      <vd-comment-add :comment="comment" v-if="reply" v-on:close="reply = false"></vd-comment-add>
    </div>
  </article>
</template>

<script>
  import {mapGetters} from 'Vuex';
  import VdCommentAdd from './CommentAdd.vue';
  import VdCommentEdit from './CommentEdit.vue';

  export default {
    name: 'VdComment',
    components: {
      'vd-comment-add': VdCommentAdd,
      'vd-comment-edit': VdCommentEdit
    },
    props: {
      comment: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        isEditing: false,
        reply: false
      };
    },
    methods: {
      permalink () {
        this.$router.push(this.$route.path + '?thread=' + this.comment.slug);
      }
    },
    computed: mapGetters({
      user: 'getUser'
    })
  };
</script>


<style scoped>

</style>
