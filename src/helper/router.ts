import { RouteRecordRaw, RouterLink } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { AppRouteRecordRaw } from '@/types/router';
import { NIcon } from 'naive-ui';
import { Component } from 'vue';

export function filterAsyncRoutes(routes: RouteRecordRaw[], permList: string[], prefix = ''): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp: RouteRecordRaw = cloneDeep<RouteRecordRaw>(route);
    const path = tmp.path.charAt(0) === '/' ? tmp.path : `${prefix}${tmp.path}`;
    if (tmp.meta?.noPerm) {
      res.push(tmp);
    } else if (permList.includes(path)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permList, `${prefix}${tmp.path}/`);
      }
      res.push(tmp);
    }
  });
  return res;
}

export function renderMenuLabel(route: AppRouteRecordRaw) {
  if (route.meta.url) {
    return h(
      'a',
      {
        href: route.meta.url,
        target: '_black'
      },
      { default: () => route.meta.title }
    );
  }
  return h(
    RouterLink,
    {
      to: {
        name: route.children ? '' : route.name
      }
    },
    { default: () => route.meta.title }
  );
}

export function renderIcon(route: AppRouteRecordRaw) {
  return route.meta.icon ? h(NIcon, null, { default: () => h(route.meta.icon as Component) }) : null;
}

export function filterHiddenRoutes(routes: AppRouteRecordRaw[]) {
  const res: AppRouteRecordRaw[] = routes.filter((item) => {
    if (item.children) {
      item.children = filterHiddenRoutes(item.children);
    }
    return !item.hidden;
  });
  return res;
}

export const filterRoutesPath = (routes: AppRouteRecordRaw[], prefix = '') => {
  const arr = cloneDeep(routes).splice(0, 1);
  const routePath:string[] = [];
  arr.map((tmp) => {
    if(tmp.children) {
      routePath.push(...filterRoutesPath(tmp.children, `${prefix}${tmp.path}/`));
    }
    routePath.push(tmp.path.charAt(0) === '/' ? tmp.path : `${prefix}${tmp.path}`);
  });
  return routePath;
};
