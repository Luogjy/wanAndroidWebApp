import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/home/Home';
import TechnologySystem from '../components/technologySystem/TechnologySystem';
import Project from '../components/project/Project';
import Collection from '../components/collection/Collection';
import Author from '../components/author/Author';
import Search from '../components/search/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/technologySystem',
      component: TechnologySystem
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/collection',
      component: Collection
    },
    {
      path: '/author/:author',
      component: Author
    },
    {
      path: '/search',
      component: Search
    }
  ]
});
