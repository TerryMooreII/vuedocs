<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        
        <vd-welcome-message></vd-welcome-message>
        <vd-tabs-filter></vd-tabs-filter>
        <Adsense
            data-ad-client="ca-pub-9441079741833119"
            data-ad-slot="3887795199">
        </Adsense>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">    
        <div v-for="(article, index) in articles" :key="article._id" v-bind:class="{border: index !==0}">
          <vd-article  :article="article"></vd-article>
          <InFeedAdsense v-if="(index + 1) % 7 === 0"
              data-ad-layout-key="-hq-1+20-7z+8j"
              data-ad-client="ca-pub-9441079741833119"
              data-ad-slot="1505174430">
          </InFeedAdsense>
        </div>
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
  import VdTabsFilter from './TabsFilter.vue';
  import VdWelcomeMessage from './WelcomeMessage.vue';

  import * as urlHelpers from '../services/urlHelpers';

  export default {
    name: 'VdArticles',
    components: {
      search: Search,
      'vd-article': VdArticle,
      'vd-pager': VdPager,
      'vd-welcome-message': VdWelcomeMessage,
      'vd-tabs-filter': VdTabsFilter
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
      '$route.query' (newVal, oldVal) {
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
  .border {
    border-top: 1px solid rgba(219,219,219,.5);
    margin-top: 1rem;
    padding-top: 1rem;
  }
</style>
