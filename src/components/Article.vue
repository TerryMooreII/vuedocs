<template>
  <article class="media has-shadow">
    <vd-vote :article="article"></vd-vote>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="is-size-5 "><a :href="article.url" class="article-title">{{article.title}}</a></strong>
          <small><em>(<a class="has-text-grey-dark article-domain" :href="article.url">{{getHostName}}</a>)</em></small>
        </p>
        <p class="info">
          <span class="has-text-grey-dark">{{article.submittedBy}}</span>
          <small><em class="has-text-grey">{{ article.submittedDate | timeago }}</em></small>
          <span class="comment" v-if="article._id && !hideCommentLink">
            <router-link class="has-text-grey"
                         :to="{ name: 'comments', params: { id: article._id }}">{{article.commentCount || 0}} Comments</router-link>
          </span>
        </p>
      </div>
      <div>
        <span class="tag is-primary is-capitalized" v-for="tag in article.tags">{{tag}}</span>
      </div>
    </div>
  </article>
</template>

<script>
  import VdVote from './Vote.vue';

  export default {
    name: 'VdArticle',
    components: {
      'vd-vote': VdVote
    },
    props: {
      article: {
        type: Object | String,
        required: true
      },
      hideCommentLink: {
        type: Boolean,
        required: false
      }
    },
    filters: {
      toDateString (date) {
        return new Date(date).toLocaleString();
      }
    },
    computed: {
      twitterUrl () {
        const url = 'https://vuedocs.io/articles/' + this.article._id;
        return `https://twitter.com/intent/tweet?text=${this.article.title} ${url} @vuedocs`;
      },
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
  .tag {
    margin-left: 4px
  }

  .twitter-share-button {
    margin-left: 4px
  }

  p {
    margin-bottom: 0 !important;
  }

  .info {
    margin-top: 4px;
  }

  .comment a {
    padding-left: 4px;
  }

  .comment:before {
    content: '|';
    color: #777;
  }

  .comment a:hover {
    text-decoration: underline;
  }

  .article-title:hover {
    color: #7a7a7a;
  }
  .article-domain  {
    text-decoration: underline;
  }
</style>
