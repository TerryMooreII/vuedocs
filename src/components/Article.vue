<template>
  <article class="media has-shadow">
      <vd-vote :article="article"></vd-vote>
    <div class="media-content">
      <div class="content">
        <p>
          <strong><a :href="article.url">{{article.title}}</a></strong> <small><em><a class="has-text-grey-dark" :href="article.url">({{getHostName}})</a></em></small>
          <br>
          <em class="is-size-6"><small class="has-text-grey">Submitted By: {{ article.submittedBy }} on {{ article.submittedDate | toDateString }}</small></em>
          <router-link :to="{ name: 'comments', params: { id: article._id }}" v-if="article._id">Comments</router-link>
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
    }
  },
  filters: {
    toDateString (date) {
      return new Date(date).toLocaleString();
    }
  },
  methods: {
  },
  computed: {
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
