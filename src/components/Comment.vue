<template>
  <div>
    <div class="columns">
      <div class="column is-offset-1-desktop is-10-desktop">
        <vd-article :article="article" v-if="article"></vd-article>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import VdArticle from './Article.vue';

  export default {
    name: 'comment',
    components: {
      'vd-article': VdArticle
    },
    data () {
      return {
        article: {}
      };
    },
    beforeRouteEnter (to, from, next) {
      axios.get(`articles/${to.params.id}`).then((response) => {
        next(vm => vm.setData(response.data));
      });
    },
    methods: {
      setData (article) {
        this.article = article;
      }
    }
  };
</script>


<style scoped>

</style>
