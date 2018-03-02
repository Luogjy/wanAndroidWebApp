import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/home/home';
import TechnologySystem from '../components/technologySystem/technologySystem';
import Project from '../components/project/project';
import Collection from '../components/collection/collection';

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
    }
  ]
});
