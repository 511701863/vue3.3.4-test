import { useCounterStore } from '@/stores/modules/counter';
import { Router } from 'vue-router';
import { asyncRoutes } from '../routes/index';
const whiteList = ['/notFound', '/login'];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async(to, from, next) => {
    if (whiteList.includes(to.path)) {
      next();
      return;
    }
    const token = localStorage.getItem('token');
    const { count, increment } = useCounterStore();
    console.log(count);

    if (count === 0) {
      const arr = [...asyncRoutes,
        {
          path: '/:pathMatch(.*)',
          name: 'Catch',
          meta: {
            title: 'NotFound'
          },
          redirect: '/notFound'
        }];
      arr.forEach((route: any) => {
        router.addRoute(route);
      });
      increment();
      console.log(router.getRoutes());
      next(to);
      return;
    }
    // if (!token) {
    //     console.log('没有权限！！！！！');
    //     return
    // }
    next();
  });
}
