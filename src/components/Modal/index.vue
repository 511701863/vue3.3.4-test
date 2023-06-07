<script lang="ts" setup>

interface Props {
  showModal: boolean;
  cancelText?: string;
  confirmText?: string;
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  showModal: false,
  cancelText: '取消',
  confirmText: '确定',
  title: ''
});

const { showModal } = toRefs(props);

const emits = defineEmits(['onCancel', 'onConfirm', 'onClose']);
const onCancel = () => {
  emits('onCancel');
};

const onConfirm = () => {
  emits('onConfirm');
};

const onClose = () => {
  emits('onClose');
};
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :title="title"
    :positive-text="confirmText"
    :negative-text="cancelText"
    :show-icon="false"
    @close="onClose"
    @positive-click="onConfirm"
    @negative-click="onCancel"
  >
    <div class="mt-large">
      <slot></slot>
    </div>
  </n-modal>
</template>

<style></style>
