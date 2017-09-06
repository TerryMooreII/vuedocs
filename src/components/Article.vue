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
          <strong><a :href="article.url">{{article.title}}</a></strong> <small><em>({{getHostName}})</em></small>
          <!--<br>-->
          <!--<small>by {{ article.author }} on {{ article.publishedDate | toDateString }}</small>-->
          <br>
          <em><small>Submitted By: {{ article.submittedBy }} on {{ article.submittedDate | toDateString }}</small></em>
        </p>
      </div>
      <div>
        <span class="tag is-primary" v-for="tag in article.tags">{{tag}}</span>
      </div>
    </div>
  </article>
</template>

<script>
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
  data () {
    return {
    };
  },
  methods: {
    thumbUp (user) {
      this.article.thumbsUp++;
    },
    thumbDown (user) {
      this.article.thumbsDown++;
    }
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
