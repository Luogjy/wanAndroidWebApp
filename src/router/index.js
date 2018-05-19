import Vue from 'vue';
import Router from 'vue-router';
// import Home from '../components/home/Home';
// import TechnologySystem from '../components/technologySystem/TechnologySystem';
// import Project from '../components/project/Project';
// import Collection from '../components/collection/Collection';
// import Author from '../components/author/Author';
// import Search from '../components/search/Search';
// import LoginRegister from '../components/loginRegister/LoginRegister';

Vue.use(Router);

// 【路由懒加载，降低首屏加载时间】
const Home = (resolve) => {
  import('../components/home/Home').then((module) => {
    resolve(module);
  });
};
const TechnologySystem = (resolve) => {
  import('../components/technologySystem/TechnologySystem').then((module) => {
    resolve(module);
  });
};
const Project = (resolve) => {
  import('../components/project/Project').then((module) => {
    resolve(module);
  });
};
const Collection = (resolve) => {
  import('../components/collection/Collection').then((module) => {
    resolve(module);
  });
};
const Author = (resolve) => {
  import('../components/author/Author').then((module) => {
    resolve(module);
  });
};
const Search = (resolve) => {
  import('../components/search/Search').then((module) => {
    resolve(module);
  });
};
const LoginRegister = (resolve) => {
  import('../components/loginRegister/LoginRegister').then((module) => {
    resolve(module);
  });
};

export default new Router({
  mode: 'history', // 默认是hash
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
    },
    {
      path: '/loginRegister',
      component: LoginRegister
    }
  ]
});
