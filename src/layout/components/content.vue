<script lang="ts" setup>
// import { useTabStore } from '@/store/modules/tab';

// const tabStore = useTabStore();
// const includeList = computed(() => {
//   return tabStore.tabs.map((route) => route.name as string);
// });

</script>

<template>
  <div class="bg-contentBg box-border flex-1 overflow-y-auto flex justify-between p-normal">
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in"
        appear
      >
        <keep-alive :include="['ThreeView']">
          <component
            :is="Component"
            :key="route.name"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style></style>
