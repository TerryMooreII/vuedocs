<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article :article="article" v-if="article" :hideCommentLink="true"></vd-article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <Adsense
            data-ad-client="ca-pub-9441079741833119"
            data-ad-slot="3887795199">
        </Adsense>
      </div>
    </div> 
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-comment-add :showCancel="true"></vd-comment-add>
      </div>
    </div>
    <div class="columns" v-if="$route.query.thread">
      <div class="column is-offset-1-desktop is-10-desktop">
        <div class="notification is-warning">
          You are only viewing a single comment thread.
          <br>
          <router-link :to="{path: $route.path}">view the rest of the comments</router-link>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-comment v-for="comment in comments" :key="comment._id" :comment="comment"
                    :style="{'padding-left': replyPos(comment.slug) + 'px'}">
        </vd-comment>
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
    name: 'VdComments',
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
        const thread = this.$route.query.thread || '';

        axios.get(`articles/${this.$route.params.id}/comments?thread=${thread}`).then(response => {
          this.comments = response.data;
        });
      },
      replyPos (slug) {
        const replyMargin = 50;

        if (!slug) {
          return 0;
        }

        const threadStartLevel = this.$route.query.thread ? this.$route.query.thread.split('').filter(l => l === '/').length : 0;

        return (slug.split('').filter(l => l === '/').length - threadStartLevel) * replyMargin;
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
      },
      $route (newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        this.getComments();
      }
    }
  };
</script>


<style scoped>

</style>
