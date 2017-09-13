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
          {{comment.text}}
          <br>
          <strong>John Smith</strong>
          <small>@johnsmith</small>
          <small>31m</small>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fa fa-reply" @click="reply = !reply"></i></span>
          </a>
          <!--<a class="level-item">-->
          <!--<span class="icon is-small"><i class="fa fa-retweet"></i></span>-->
          <!--</a>-->
          <!--<a class="level-item">-->
          <!--<span class="icon is-small"><i class="fa fa-heart"></i></span>-->
          <!--</a>-->
        </div>
        <vd-comment-add :comment="comment" v-if="reply"></vd-comment-add>
      </nav>
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
    },
    mounted () {
      console.log('from comment', this.comment);
    }
  };
</script>


<style scoped>

</style>
