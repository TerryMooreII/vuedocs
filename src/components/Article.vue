<template>
  <article class="media has-shadow">
    <div class="media-left">
      <div class="image is-64x64 ">
       <div class="has-text-left cursor-pointer" @click="thumbUp">
         <i class="fa fa-thumbs-o-up has-text-success"></i> <strong>{{article.thumbsUp}}</strong>
       </div>

        <div class="has-text-right cursor-pointer" @click="thumbDown">
          <strong>{{article.thumbsDown}}</strong> <i class="fa fa-thumbs-o-down has-text-danger"></i>
        </div>
      </div>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong><a :href="article.url">{{article.title}}</a></strong> <small><em><a class="has-text-grey-dark" :href="article.url">({{getHostName}})</a></em></small>
          <br>
          <em class="is-size-6"><small class="has-text-grey">Submitted By: {{ article.submittedBy.displayName }} on {{ article.submittedDate | toDateString }}</small></em>
        </p>
      </div>
      <div>
        <span class="tag is-primary is-capitalized" v-for="tag in article.tags">{{tag}}</span>
      </div>
    </div>

  </article>

</template>

<script>
import {mapGetters} from 'vuex';
import {db} from '../services/FirebaseService';

export default {
  name: 'VdArticle',
  props: {
    article: {
      type: Object | String,
      required: true
    }
  },
  filters: {
    toDateString (date) {
      return new Date(date).toLocaleString();
    }
  },
  firebase: {
    articleRef: {
      source: db.ref(`articles`)
    },
    articleVoteRef: {
      source: db.ref(`article-vote`)
    }
  },
  data () {
    return {
    };
  },
  methods: {
    getRef () {
      const clone = Object.assign({}, this.article);
      const item = this.$firebaseRefs.articleRef.child(clone['.key']);
      delete clone['.key'];
      return {
        clone, item
      };
    },
    logVote () {

    },
    hasVoted (item) {
      if (item.votes) {
        // var usersVote =
      }
    },
    thumbUp () {
      const {clone, item} = this.getRef();
      item.set(Object.assign({thumbsUp: clone.thumbsUp++}, clone));
      this.logVote();
    },
    thumbDown () {
      const {clone, item} = this.getRef();
      item.set(Object.assign({thumbsDown: clone.thumbsDown++}, clone));
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    getHostName () {
      if (!this.article || !this.article.url) {
        return '';
      }
      let hostname;
      let url = this.article.url;

      if (url.indexOf('://') > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }

      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];
      hostname = hostname.replace('www.', '');

      return hostname;
    }
  }
};
</script>


<style scoped>
  .tag{ margin-left: 4px }
</style>
