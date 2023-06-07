import { AppRouteRecordRaw } from '@/types/routeType';
const LAYOUT = () => import('@/layout/index.vue');

const routes: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: LAYOUT,
  meta: {
    title: '首页'
  },
  children: [{
    path: 'index',
    name: 'HomePage',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '首页'
    }
  }]
};

export default routes;
