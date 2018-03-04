<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <Adsense
            data-ad-client="ca-pub-9441079741833119"
            data-ad-slot="3887795199">
        </Adsense>        
        
          
        <article class="media" v-for="(comment, index) in comments" :key="comment._id" v-bind:class="{border: index !==0}">
          <figure class="media-left is-hidden-mobile">
            <p class="image is-32x32">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong class="has-text-grey-dark">{{ comment.author.username }}</strong> 
                <small><em class="has-text-grey">{{ comment.posted | timeago }}</em></small>
                <small><router-link :to="{ name: 'comments', params: { id: comment.articleId._id }, query: { thread: comment.slug }}">Parent</router-link></small>
                <small>on: <router-link :to="{ name: 'comments', params: { id: comment.articleId._id }}">{{ comment.articleId.title }}</router-link></small>
                <br>
                {{ comment.text }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-pager :page="page" :total="comments.length || 0" @change="pageChanged"></vd-pager>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import VdPager from './pager';
// import urlHelpers from '../services/urlHelpers';

export default {
  name: 'VdCommentsList',
  components: {
    'vd-pager': VdPager
  },
  data () {
    return {
      comments: []
    };
  },
  computed: {
    page () {
      return this.$route.query.page;
    }
  },
  watch: {
    '$route.query' (newVal, oldVal) {
      if (oldVal) {
        this.getComments();
      }
    }
  },
  methods: {
    getComments () {
      const query = ''; // this.$route.query; // ? '?' + urlHelpers.serialize(this.$route.query) : '';
      axios.get('comments' + query).then(response => {
        this.comments = response.data;
      });
    },
    pageChanged (val) {
      let query = Object.assign({}, this.$route.query);
      query.page = val;

      this.$router.push({
        name: 'comments',
        query
      });
    }
  },
  mounted () {
    this.getComments();
  }
};
</script>

<style scoped>
.border {
  border-top: 1px solid rgba(219,219,219,.5);
  margin-top: 1rem;
  padding-top: 1rem;
  }
</style>
