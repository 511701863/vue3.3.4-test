import { AppRouteRecordRaw } from '../../types/routeType';
const modules = import.meta.glob('./modules/*.ts', { eager: true });

const routeModules:AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default;
  routeModules.push(mod);
});

export const asyncRoutes = routeModules;
