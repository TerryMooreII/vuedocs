<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article v-for="article in articles" :key="article._id" :article="article"></vd-article>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter is-full-mobile">
        <search></search>
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
    watch: {
      $route (newVal, oldVal) {
        if (oldVal) {
          this.getArticles();
        }
      }
    },
    methods: {
      getArticles () {
        const query = this.$route.query ? '?' + this.queryStringSerializer(this.$route.query) : '';
        axios.get('articles' + query).then(response => {
          this.articles = response.data;
        });
      },
      queryStringSerializer (obj) {
        let str = [];
        for (let p in obj) {
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        }

        return str.join('&');
      }
    },
    mounted () {
      this.getArticles();
    }
  };
</script>


<style scoped>

</style>
