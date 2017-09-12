import Vue from 'vue';
import Router from 'vue-router';
import Articles from '@/components/Articles';
import ArticleForm from '@/components/ArticleForm';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Comments from '@/components/Comment';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles
    },
    {
      path: '/:id',
      name: 'comments',
      component: Comments
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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});
