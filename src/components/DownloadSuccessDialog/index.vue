<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

interface Props {
  visible: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});
const emits = defineEmits(['update:visible']);
const { visible } = toRefs(props);
const onConfirm = async() => {
  router.push({ path: '/businessManage/exportQuery' });
  beforeColse();
};
const beforeColse = () => {
  emits('update:visible', false);
};
</script>

<template>
  <div>
    <Modal
      ref="downloadRef"
      v-model:show-modal="visible"
      title="提示"
      show-icon
      style="width: 400px"
      cancel-text="确定"
      confirm-text="查看导出任务"
      @on-cancel="beforeColse"
      @on-close="beforeColse"
      @on-confirm="onConfirm"
    >
      <div style="color: #009F59">
        已创建导出任务，正在导出相关数据
      </div>
    </Modal>
  </div>
</template>
