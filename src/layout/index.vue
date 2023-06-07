<script lang="ts" setup>
import Content from './components/content.vue';
// import Header from './components/header.vue';
import Sidebar from './components/sidebar.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// :class="[appStore.collapsed ? 'left-sidebar--collapsed w-content--collapsed' : 'left-sidebar w-content']"
</script>

<template>
  <div class="h-screen flex flex-col">
    <Sidebar />
    <div class="content-wrapper h-full flex flex-col overflow-x-hidden fixed right-0 bottom-0 left-sidebar w-content">
      <div class="h-100px w-screen px-30px pt-normal bg-gray-500">
        <n-button>Default</n-button>
        <n-button
          type="success"
          @click="router.push('/home/index')"
        >
          Success
        </n-button>
        <n-button
          type="warning"
          @click="router.push('/three')"
        >
          Warning
        </n-button>
      </div>
      <Content />
    </div>
  </div>
</template>

<style></style>
