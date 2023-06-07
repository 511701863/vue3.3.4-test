<script lang="ts" setup>
import { getSelectList } from '@/api/select';

interface Props {
  modelValue?: any;
  hasAll?: boolean;
  value?: string | number | any;
  label?: string | number;
  api?: string;
  allName?: string;
  otherParams?: any
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  hasAll: false,
  value: 'value',
  label: 'name',
  api: '',
  allName: '全部',
  otherParams: {}
});

const emits = defineEmits(['update:modelValue']);

const refOption = reactive({
  selected: null,
  selectList: [],
  pagination: {
    pageIndex: 1,
    pageSize: 10,
    total: 0
  }
});
const { selectList, selected, pagination } = toRefs(refOption);
const getList = async() => {
  const { pageIndex, pageSize } = pagination.value;
  const params = {
    pageIndex,
    pageSize,
    ...props.otherParams
  };
  const { data }:any = await getSelectList(props.api, params);
  const list = data?.data || [];
  list.map((item:any) => {
    item.value = item[props.value];
    item.label = item[props.label];
  });
  if (props.hasAll) {
    selectList.value = [{ label: props.allName, value: '' }, ...list] as typeof list;
  } else {
    selectList.value = list;
  }
  if(data?.total) {
    pagination.value.total = data.total || 0;
    pagination.value.pageIndex++;
  }
};
// 分页
const handleScroll = async(e:any) => {
  const currentTarget = e.currentTarget as HTMLElement;
  if (
    currentTarget.scrollTop + currentTarget.offsetHeight >=
    currentTarget.scrollHeight
  ) {
    const { pageIndex, pageSize, total } = pagination.value;
    if (((pageIndex - 1) * pageSize >= total) || !total) {
      return;
    }
    const params = {
      pageIndex,
      pageSize,
      ...props.otherParams
    };
    const { data }:any = await getSelectList(props.api, params);
    const list = data?.data || [];
    list.map((item:any) => {
      item.value = item[props.value];
      item.label = item[props.label];
    });
    selectList.value = [...selectList.value, ...list] as typeof list;
    if(data?.total) {
      pagination.value.total = data.total || 0;
      pagination.value.pageIndex++;
    }
  }
};
watch(() => props.modelValue, (val) => {
  selected.value = val;
}, { immediate: true });

watch(() => selected.value, (val) => {
  emits('update:modelValue', val);
});

onMounted(() => {
  getList();
});
</script>

<template>
  <n-select
    v-model:value="selected"
    :options="selectList"
    remote
    v-bind="$attrs"
    :reset-menu-on-options-change="false"
    @scroll="handleScroll"
  />
</template>

<style lang="scss" scoped></style>
