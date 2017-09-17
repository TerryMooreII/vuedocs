<template>
  <article class="media">
    <!--<figure class="media-left">-->
    <!--<p class="image is-64x64">-->
    <!--<img src="http://bulma.io/images/placeholders/128x128.png">-->
    <!--</p>-->
    <!--</figure>-->
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{comment.author.username}}</strong>
          <small>{{comment.posted | timeago}}</small>
          <br>
          {{comment.text}}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" @click="reply = !reply">
            <span class="icon is-small"><i class="fa fa-reply" ></i></span>&nbspReply
          </a>
          <a class="level-item">
          <span class="icon is-small"><i class="fa fa-heart"></i></span>&nbspLike
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fa fa-twitter"></i></span>&nbspTweet
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fa fa-link"></i></span>&nbspPermalink
          </a>
        </div>
      </nav>
      <vd-comment-add :comment="comment" v-if="reply" v-on:close="reply = false"></vd-comment-add>
    </div>
  </article>
</template>

<script>
  import VdCommentAdd from './CommentAdd.vue';

  export default {
    name: 'VdComment',
    components: {
      'vd-comment-add': VdCommentAdd
    },
    props: {
      comment: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        reply: false
      };
    }
  };
</script>


<style scoped>

</style>
