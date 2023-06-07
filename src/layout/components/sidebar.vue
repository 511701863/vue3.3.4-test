<script lang="ts" setup>
import Logo from '@/assets/images/loginLogo.png';
import { renderMenuLabel, renderIcon, filterHiddenRoutes } from '@/helper/router';
// import { useAppStore } from '@/store/modules/app';
// import { usePermissionStore } from '@/store/modules/permission';
import { useRoute, useRouter } from 'vue-router';
import { AppRouteRecordRaw } from '@/types/routeType';

// const appStore = useAppStore();
// const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();
const routerList:any = router.getRoutes().filter((item) => item.children.length);
console.log(routerList);

// const menuList = filterHiddenRoutes(permissionStore.routes as AppRouteRecordRaw[]); // 过滤hidden
// :class="[appStore.collapsed ? 'w-sidebar--collapsed' : 'w-sidebar']"
// :collapsed="appStore.collapsed"
</script>

<template>
  <div
    class="h-full bg-navBg fixed z-30 top-0 left-0 flex flex-col w-200px"
  >
    <div class="h-header bg-logoBg flex items-center justify-center">
      <div class="w-72 h-header flex items-center">
        <n-image
          :src="Logo"
          :preview-disabled="true"
        />
      </div>
    </div>
    <n-scrollbar class="flex-1">
      <n-menu
        :value="(route.name as string)"
        :options="routerList"
        :indent="0"
        :root-indent="20"
        key-field="name"
        :collapsed-width="56"
        :render-label="(route: any) => renderMenuLabel(route)"
        :render-icon="(route: any) => renderIcon(route)"
        :accordion="true"
      />
    </n-scrollbar>
  </div>
</template>

<style></style>
