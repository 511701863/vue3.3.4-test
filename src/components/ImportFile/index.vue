<script lang="ts" setup>
import { ref, toRefs, reactive } from 'vue';
import { NInput } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();
interface Props {
  visible: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});
const emits = defineEmits(['update:visible', 'import']);
const { visible } = toRefs(props);
const downloadRef = ref();

const refOption = reactive({
  fileName: '',
  fileList: [],
  files: ''
});
const { fileName, fileList, files } = toRefs(refOption);
const uploadFile = async(fileParams:any) => {
  const { file } = fileParams.file;
  files.value = file;
  fileName.value = file.name;
};
const handRemove = () => {
  fileList.value.splice(0, 1);
};
const onConfirm = async() => {
  const orgId:string = appStore.orgId || '';
  const formData = new FormData();
  formData.append('file', files.value);
  formData.append('orgId', orgId);
  emits('import', formData);
};
watch(() => props.visible, (val) => {
  if (!val) {
    fileName.value = '';
    fileList.value = [];
    files.value = '';
  }
});
const beforeColse = () => {
  emits('update:visible', false);
};
</script>

<template>
  <div>
    <Modal
      ref="downloadRef"
      v-model:show-modal="visible"
      title="导入"
      style="width: 600px"
      @on-cancel="beforeColse"
      @on-close="beforeColse"
      @on-confirm="onConfirm"
    >
      <n-upload
        :file-list="fileList"
        :show-trigger="fileList.length < 1"
        :default-file-list="fileList"
        v-bind="$attrs"
        style="margin: 40px 10px 60px"
        @change="uploadFile"
        @remove="handRemove"
      >
        <n-input-group>
          <n-button type="primary">
            选择文件
          </n-button>
          <n-input
            v-model:value="fileName"
            placeholder="请选择含车辆数据的Excel文件"
            readonly
            style="width: 300px"
          />
        </n-input-group>
      </n-upload>
    </Modal>
  </div>
</template>
