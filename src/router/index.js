import Vue from 'vue';
import Router from 'vue-router';
import Articles from '@/components/Articles';
import ArticleForm from '@/components/ArticleForm';
import Login from '@/components/Login';

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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
