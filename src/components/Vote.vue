<template>
  <div class="media-left">
    <div class="image has-text-centered has-text-grey">
      <div @click="voteUp">
        <i :class="{fa: true, 'fa-caret-up': true, 'has-text-success': this.vote === 1}"></i>
      </div>
      <div class="total">
        {{article.votesUp - article.votesDown}}
      </div>
      <div @click="voteDown">
        <i :class="{fa: true, 'fa-caret-down': true, 'has-text-danger': this.vote === -1}"></i>
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
      voteUp () {
        // check if users voted and change it also add to remove from votes up if they already have a votes down vote etc.

        if (!this.user) {
          console.log('you must be logged in to vote');
          return;
        }

        if (this.vote === -1) {
          this.article.votesDown--;
        }

        if (this.vote === 0 || this.vote === -1) {
          this.article.votesUp++;
        } else if (this.vote === 1) {
          this.article.votesUp--;
        }

        this.article.votes = this.article.votes || {};
        this.article.votes[this.user._id] = this.vote = this.vote === 1 ? 0 : 1;

        this.save();
      },
      voteDown () {
        if (!this.user) {
          console.log('you must be logged in to vote');
          return;
        }

        if (this.vote === 1) {
          this.article.votesUp--;
        }

        if (this.vote === 0 || this.vote === 1) {
          this.article.votesDown++;
        } else if (this.vote === -1) {
          this.article.votesDown--;
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
  .media-left {
    margin: -5px 20px auto 20px;
  }
  .total {
    margin: 4px auto;
  }
  .fa {
    font-size:1.8em
  }
</style>
