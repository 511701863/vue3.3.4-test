<script lang="ts" setup>

interface Props {
  modelValue?: any
  size?: string | number;
  reg?: RegExp | null;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: {},
  size: '', // 上传单位为kb
  reg: null
});
const emits = defineEmits(['update:modelValue']);

const refOption = reactive({
  fileList: []
});
const { fileList }:any = toRefs(refOption);
const uploadFile = async(fileParams:any) => {
  const { file } = fileParams.file;
  fileList.value = fileParams.fileList;
  if(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e:any) {
      for (let i = 0; i < fileList.value.length; i++) {
        fileList.value[i].url = e.target?.result;
        fileList.value[i].status = 'finished';
      }
    };
  }
};

const beforeUpload = async({ file }:any) => {
  const { size, name } = file.file;
  if (props.reg && !props.reg.test(name.toLowerCase())) {
    window.$message?.error('选择的文件格式不正确，请重新上传');
    return false;
  }
  if (props.size && size > (+(props.size) * 1024)) {
    window.$message?.error(`文件大小不能超过${props.size}KB`);
    return false;
  }
  return true;
};

const handRemove = () => {
  fileList.value.splice(0, 1);
};

watch(() => props.modelValue, (val) => {
  if(Array.isArray(val)) {
    fileList.value = val;
  }else {
    fileList.value = [];
    if(val?.url) {
      fileList.value.push(val);
    }
  }
}, { immediate: true, deep: true });
watch(() => fileList.value, (val) => {
  emits('update:modelValue', val);
}, { deep: true });
</script>

<template>
  <div class="upload">
    <n-upload
      list-type="image-card"
      :file-list="fileList"
      :show-trigger="fileList.length < 1"
      :default-file-list="fileList"
      v-bind="$attrs"
      @before-upload="beforeUpload"
      @change="uploadFile"
      @remove="handRemove"
    />
  </div>
</template>

<style lang="scss">
.upload{
  .n-upload-file-list .n-upload-file.n-upload-file--image-card-type{
    border: 1px solid #184e37;
  }
}
</style>

