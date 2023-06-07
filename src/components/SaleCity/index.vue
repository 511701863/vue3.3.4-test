<script lang="ts" setup>
import city from '@/utils/city';

interface Props {
  modelValue?: any
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null
});
const { modelValue } = toRefs(props);
const emits = defineEmits(['update:modelValue']);
const refOption = reactive({
  selectList: <Record<string, any>[]>[]
});
const { selectList } = toRefs(refOption);
const handleUpdateValue = (e:string) => {
  emits('update:modelValue', e);
};
const getRegionList = () => {
  city.province.map((item:any) => {
    item.value = item.ssqid;
    item.label = item.ssqname;
    if(item.cities.city) {
      item.children = item.cities.city;
      item.children.map((item2:any) => {
        item2.value = item2.ssqid;
        item2.label = item2.ssqname;
      });
    }
  });
  selectList.value = city.province;
};
onMounted(() => {
  getRegionList();
});
</script>

<template>
  <n-cascader
    v-model:value="modelValue"
    placeholder="请选择"
    :options="selectList"
    check-strategy="child"
    @update:value="handleUpdateValue"
  />
</template>

<style lang="scss" scoped></style>
