<script lang="ts" setup>
import DateTool from '@/utils/date';
import { FAST_TIME_CHOOSE } from '@/config/enum';

interface Props {
  modelValue?: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 30
});
const emits = defineEmits(['update:modelValue', 'chooseTime']);
const refOption = reactive({
  timeType: 30
});
const { timeType } = toRefs(refOption);

watch(() => props.modelValue, (val) => {
  timeType.value = val;
});
watch(() => timeType.value, (val) => {
  emits('update:modelValue', val);
  if(val !== 12) { // 最近1天  最近30天  最近180天  最近12个月
    emits('chooseTime', [DateTool.latestDay(val), DateTool.nowTime()]);
  }else{
    emits('chooseTime', [DateTool.latestMonth(val), DateTool.nowTime()]);
  }
});
onMounted(() => {
  emits('chooseTime', [DateTool.latestDay(1), DateTool.nowTime()]);
});
</script>

<template>
  <n-radio-group v-model:value="timeType">
    <n-radio-button
      v-for="item in FAST_TIME_CHOOSE"
      :key="item.value"
      :value="item.value"
      :label="item.label"
      :checked="timeType === item.value"
    />
  </n-radio-group>
</template>

<style lang="scss" scoped></style>
