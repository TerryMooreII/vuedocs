<template>
  <div>
    <!--<div class="columns">-->
      <!--<div class="column is-half is-offset-one-quarter is-full-mobile">-->
        <!--<search></search>-->
      <!--</div>-->
    <!--</div>-->
    <!--<hr>-->

    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article v-for="article in articles" :key="article._id" :article="article"></vd-article>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Search from './Search.vue';
  import VdArticle from './Article.vue';

  export default {
    name: 'articles',
    components: {
      search: Search,
      'vd-article': VdArticle
    },
    data () {
      return {
        articles: []
      };
    },
    mounted () {
      axios.get('articles').then(response => {
        this.articles = response.data;
      });
    }
  };
</script>


<style scoped>

</style>
