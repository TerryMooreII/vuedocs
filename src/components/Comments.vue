<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article :article="article" v-if="article" :hideCommentLink="true"></vd-article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-comment-add :showCancel="true"></vd-comment-add>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-comment v-for="comment in comments" :comment="comment"
                    :style="{'padding-left': replyPos(comment.slug) + 'px'}"></vd-comment>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'Vuex';
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
        comments: [],
        showCommentBox: false
      };
    },
    beforeRouteEnter (to, from, next) {
      axios.get(`articles/${to.params.id}`).then((response) => {
        next(vm => vm.setArticle(response.data));
      });
    },
    methods: {
      setArticle (article) {
        this.article = article;
        this.getComments();
      },
      getComments () {
        axios.get(`articles/${this.$route.params.id}/comments`).then(response => {
          this.comments = response.data;
        });
      },
      replyPos (slug) {
        const replyMargin = 50;
        if (!slug) {
          return 0;
        }
        return slug.split('').filter(l => l === '/').length * replyMargin;
      }
    },
    computed: mapGetters({
      comment: 'getComment'
    }),
    watch: {
      comment: function (newComment) {
        if (newComment) {
          this.getComments();
        }
      }
    }
  };
</script>


<style scoped>

</style>
