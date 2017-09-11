<template>
  <div class="media-left">
    <div class="image is-64x64 ">
      <div class="has-text-left cursor-pointer" @click="thumbUp">
        <i
          :class="{fa: true, 'has-text-success': true, 'fa-thumbs-up': this.vote === 1, 'fa-thumbs-o-up': this.vote != 1}"></i>
        <strong>{{article.thumbsUp}}</strong>
      </div>

      <div class="has-text-right cursor-pointer" @click="thumbDown">
        <strong>{{article.thumbsDown}}</strong>
        <i
          :class="{fa: true, 'has-text-danger': true, 'fa-thumbs-down': this.vote === -1, 'fa-thumbs-o-down': this.vote !== -1}"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import axios from 'axios';

  export default {
    name: 'VdVote',
    props: {
      article: {
        type: Object | String,
        required: true
      }
    },
    data () {
      return {
        vote: 0
      };
    },
    mounted () {
      this.vote = this.hasVote();
    },
    methods: {
      hasVote () {
        return this.user && this.article.votes && this.article.votes[this.user._id] ? this.article.votes[this.user._id] : 0;
      },
      thumbUp () {
        // check if users voted and change it also add to remove from thumbs up if they already have a thumbs down vote etc.

        if (!this.user) {
          return;
        }

        if (this.vote === -1) {
          this.article.thumbsDown--;
        }

        if (this.vote === 0 || this.vote === -1) {
          this.article.thumbsUp++;
        } else if (this.vote === 1) {
          this.article.thumbsUp--;
        }

        this.article.votes = this.article.votes || {};
        this.article.votes[this.user._id] = this.vote = this.vote === 1 ? 0 : 1;

        this.save();
      },
      thumbDown () {
        if (!this.user) {
          return;
        }

        if (this.vote === 1) {
          this.article.thumbsUp--;
        }

        if (this.vote === 0 || this.vote === 1) {
          this.article.thumbsDown++;
        } else if (this.vote === -1) {
          this.article.thumbsDown--;
        }

        this.article.votes = this.article.votes || {};
        this.article.votes[this.user._id] = this.vote = this.vote === -1 ? 0 : -1;
        this.save();
      },
      save () {
        axios.put(`articles/${this.article._id}`, this.article).then(response => {
          this.article.votes = response.data.votes;
        });
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    }
  };
</script>


<style scoped>

</style>
