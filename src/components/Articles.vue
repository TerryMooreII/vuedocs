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
        <vd-article v-for="article in articles" :article="article"></vd-article>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search.vue';
  import VdArticle from './Article.vue';

  import {db} from '../services/FirebaseService';

  export default {
    name: 'articles',
    components: {
      search: Search,
      'vd-article': VdArticle
    },
    firebase: {
      articlesRef: {
        source: db.ref(`articles`).orderByChild('submittedDate')
      }
    },
    data () {
      return {

      };
    },
    computed: {
      articles () {
        return this.articlesRef.sort((a, b) => a.submittedDate < b.submittedDate);
        // return this.articlesRef.filter(article => article && article.tags && article.tags.indexOf('Router') > -1);
      }
    }
  };
</script>


<style scoped>

</style>
