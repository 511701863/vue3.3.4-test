import { Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';

export function createRouterGuard(router:Router) {
  createPermissionGuard(router);
}
