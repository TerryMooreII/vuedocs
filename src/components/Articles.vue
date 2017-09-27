<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article v-for="article in articles" :key="article._id" :article="article"></vd-article>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-pager :page="page" :total="articles.length || 0" @change="pageChanged"></vd-pager>
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
  import VdPager from './Pager.vue';

  import * as urlHelpers from '../services/urlHelpers';

  export default {
    name: 'VdArticles',
    components: {
      search: Search,
      'vd-article': VdArticle,
      'vd-pager': VdPager
    },
    data () {
      return {
        articles: []
      };
    },
    computed: {
      page () {
        return this.$route.query.page;
      }
    },
    watch: {
      '$route.query.page' (newVal, oldVal) {
        if (oldVal) {
          this.getArticles();
        }
      }
    },
    methods: {
      getArticles () {
        const query = this.$route.query ? '?' + urlHelpers.serialize(this.$route.query) : '';
        axios.get('articles' + query).then(response => {
          this.articles = response.data;
        });
      },
      pageChanged (val) {
        let query = Object.assign({}, this.$route.query);
        query.page = val;

        this.$router.push({
          name: 'articles',
          query
        });
      }
    },
    mounted () {
      this.getArticles();
    }
  };
</script>


<style scoped>

</style>
