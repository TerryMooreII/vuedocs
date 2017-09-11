<template>
  <article class="media has-shadow">
    <div class="media-left">
      <div class="image is-64x64 ">
       <div class="has-text-left cursor-pointer" @click="thumbUp">
         <i :class="{fa: true, 'has-text-success': true, 'fa-thumbs-up': this.vote === 1, 'fa-thumbs-o-up': this.vote != 1}"></i> <strong>{{article.thumbsUp}}</strong>
       </div>

        <div class="has-text-right cursor-pointer" @click="thumbDown">
          <strong>{{article.thumbsDown}}</strong>
          <i :class="{fa: true, 'has-text-danger': true, 'fa-thumbs-down': this.vote === -1, 'fa-thumbs-o-down': this.vote !== -1}"></i>
        </div>
      </div>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong><a :href="article.url">{{article.title}}</a></strong> <small><em><a class="has-text-grey-dark" :href="article.url">({{getHostName}})</a></em></small>
          <br>
          <em class="is-size-6"><small class="has-text-grey">Submitted By: {{ article.submittedBy }} on {{ article.submittedDate | toDateString }}</small></em>
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
import axios from 'axios';

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
      vote: 0
    };
  },
  mounted () {
    this.vote = this.hasVote();
    console.log(this.vote);
  },
  methods: {
    hasVote () {
      return this.article.votes && this.article.votes[this.user.user._id] ? this.article.votes[this.user.user._id] : 0;
    },
    thumbUp () {
      // check if users voted and change it also add to remove from thumbs up if they already have a thumbs down vote etc.

      if (this.user) {
        this.article.thumbsUp++;
        this.article.votes = this.article.votes || {};
        this.article.votes[this.user.user._id] = 1;
        this.save();
      }
    },
    thumbDown () {
      if (this.user) {
        this.article.thumbsDown++;
        this.article.votes = this.article.votes || {};
        this.article.votes[this.user.user._id] = -1;
        this.save();
      }
    },
    save () {
      axios.put(`articles/${this.article._id}`, this.article).then(response => {
        this.article.votes = response.data.votes;
        this.hasVote();
      });
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
