import Vue from 'vue';
import Router from 'vue-router';
import Articles from '@/components/Articles';
import ArticleForm from '@/components/ArticleForm';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Comments from '@/components/Comments';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});
