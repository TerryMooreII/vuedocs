<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article :article="article" v-if="article"></vd-article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-comment v-for="comment in comments" :comment="comment"></vd-comment>
        <vd-comment-add></vd-comment-add>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import VdArticle from './Article.vue';
  import VdComment from './Comment.vue';
  import VdCommentAdd from './CommentAdd.vue';

  export default {
    name: 'comments',
    components: {
      'vd-article': VdArticle,
      'vd-comment': VdComment,
      'vd-comment-add': VdCommentAdd
    },
    data () {
      return {
        article: {},
        comments: []
      };
    },
    beforeRouteEnter (to, from, next) {
      axios.get(`articles/${to.params.id}`).then((response) => {
        next(vm => vm.setData(response.data));
      });
    },
    methods: {
      setData (article) {
        this.article = article;

        axios.get(`articles/${this.$route.params.id}/comments`).then(response => {
          this.comments = response.data;
        });
      }
    }
  };
</script>


<style scoped>

</style>
