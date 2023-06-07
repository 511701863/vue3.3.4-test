<script lang="ts" setup>
import { useThemeStore } from '@/stores/modules/theme';
import { zhCN, dateZhCN } from 'naive-ui';
const themeStore = useThemeStore();
</script>
<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeStore.themeOverrides"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-el
              tag="div"
              class="text-textDefault"
            >
              <router-view v-slot="{Component}">
                <transition
                  name="fade"
                  mode="out-in"
                  appear
                >
                  <component :is="Component" />
                </transition>
              </router-view>
            </n-el>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

