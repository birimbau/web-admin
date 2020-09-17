import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';


Vue.use(Router);

interface RouteOptions {
  alias?: string;
}

export const createRoute = (name: string, options: RouteOptions = {}) => {
  const component = () => import(`./pages/${name}.vue`);

  return {
    name,
    component,
    path: `/${name}`.toLowerCase().replace(/_/g, ':').replace('index', ''),
    ...options,
  };
};

export const routes: Array<RouteConfig> = [
  // Index
  createRoute('Index'),

  // Services
  createRoute('Services/Index'),
  createRoute('Services/Aws'),
  createRoute('Services/Gcp'),
  createRoute('Services/GoogleDrive'),

  // Concepts
  createRoute('Concepts/Index'),
  createRoute('Concepts/_uuid'),
];

export const router = new Router({
  mode: 'history',
  routes,
});
