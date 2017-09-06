import Vue from 'vue';
import Router from 'vue-router';
import Articles from '@/components/Articles';
import ArticleForm from '@/components/ArticleForm';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles
    },
    {
      path: '/add',
      name: 'add-article',
      component: ArticleForm
    }
  ]
});
