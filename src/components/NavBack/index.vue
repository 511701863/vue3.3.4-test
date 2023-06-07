<script lang="ts" setup>
import Back_Icon from '@/assets/images/back.png';
import { useRouter } from 'vue-router';
const router = useRouter();
interface Props {
  backTitle?: string
}
const props = withDefaults(defineProps<Props>(), {
  backTitle: '返回'
});
const back = async() => {
  router.go(-1);
};
</script>

<template>
  <div class="border-b border-b-bColor pb-normal box-border">
    <div class="flex items-center">
      <div
        class="cursor-pointer flex items-center"
        @click="back"
      >
        <n-image
          :src="Back_Icon"
          class="w-16 h-16 mr-8"
          :preview-disabled="true"
        />
        {{ backTitle }}
      </div>
      <div class="ml-normal">
        <slot name="title"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
