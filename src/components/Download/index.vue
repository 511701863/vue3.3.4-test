<script lang="ts" setup>
import { ref, toRefs, reactive, computed } from 'vue';
import { FormConfig } from '../Form/types';
import { NInput } from 'naive-ui';
import { isInteger } from '@/utils/validate';

interface Props {
  visible: boolean;
  total: number;
  pageSize: number;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  total: 0,
  pageSize: 10
});
const emits = defineEmits(['update:visible', 'exportFile']);
const { visible } = toRefs(props);
const source = () => {
  return {
    startPage: '',
    endPage: ''
  };
};
const downloadFormRef = ref();
const downloadRef = ref();
const refOption = reactive({
  downloadForm: source()
});
const { downloadForm } = toRefs(refOption);
const downloadConfig = computed(() => {
  const arr: FormConfig<typeof downloadForm.value>[] = [
    {
      type: 'component',
      component: NInput,
      key: 'startPage',
      span: 12,
      label: '开始页码',
      props: {
        placeholder: '开始页码'
      },
      itemProps: {
        rule: [
          { validator: (rule, value) => {
            return new Promise<void>((resolve, reject) => {
              if(!isInteger(value)) {
                reject(Error('开始页码必须是正整数'));
                return;
              }
              if((props.total + props.pageSize) < props.pageSize * Number(value)) {
                reject(Error(`开始页码不能大于${(Math.ceil(props.total / props.pageSize) + 1)}`));
              }else {
                resolve();
              }
            });
          }, required: true, trigger: ['blur'] }
        ]
      }
    },
    {
      type: 'component',
      component: NInput,
      key: 'endPage',
      span: 12,
      label: '结束页码',
      props: {
        placeholder: '结束页码'
      },
      itemProps: {
        rule: [
          { validator: (rule, value) => {
            return new Promise<void>((resolve, reject) => {
              if(!isInteger(value)) {
                reject(Error('结束页码必须是正整数'));
                return;
              }
              if((props.total + props.pageSize) < props.pageSize * Number(value)) {
                reject(Error(`结束页码不能大于${(Math.ceil(props.total / props.pageSize) + 1)}`));
              }else {
                resolve();
              }
            });
          }, required: true, trigger: ['blur'] }
        ]
      }
    }
  ];
  return arr;
});
const onConfirm = async() => {
  const { startPage, endPage } = downloadForm.value;
  if(startPage > endPage) {
    window.$message?.warning('开始页码不能大于结束页码');
    return;
  }
  await downloadFormRef.value.validate().catch(() => {
    return Promise.reject(false);
  });

  const params = {
    ...downloadForm.value
  };
  emits('exportFile', params);
  beforeColse();
};
const beforeColse = () => {
  downloadForm.value = source();
  emits('update:visible', false);
};
</script>

<template>
  <div>
    <Modal
      ref="downloadRef"
      v-model:show-modal="visible"
      title="导出"
      style="width: 700px"
      @on-cancel="beforeColse"
      @on-close="beforeColse"
      @on-confirm="onConfirm"
    >
      <Form
        ref="downloadFormRef"
        v-model:data="downloadForm"
        :config="downloadConfig"
      />
    </Modal>
  </div>
</template>
