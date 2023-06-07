<script lang="ts" setup>
import DateTool from '@/utils/date';
interface Props {
  dateType?: string;
}
const props = withDefaults(defineProps<Props>(), {
  dateType: ''
});
const emits = defineEmits(['chooseTime']);
const refOption = reactive({
  selectedTime: null
});
const { selectedTime } = toRefs(refOption);
const clickFastDate = () => {
  selectedTime.value = null;
  if(props.dateType === 'DAILY') {
    emits('chooseTime', [DateTool.latestDay(30), DateTool.nowTime()]);
  }else{
    emits('chooseTime', [DateTool.latestMonth(12), DateTool.nowTime()]);
  }
};
const disableDayTimeFun = (time: number, type: 'start' | 'end', range: [number, number] | null) => {
  if(props.dateType === 'DAILY') {
    return DateTool.disableDayTime(time, type, range, 30);
  }else{
    return DateTool.disableMonthTime(time, type, range, 12);
  }
};
watch(() => props.dateType, () => {
  clickFastDate();
});
watch(() => selectedTime.value, () => {
  if(Array.isArray(selectedTime.value)) {
    emits('chooseTime', selectedTime.value);
  }
});
onMounted(() => {
  emits('chooseTime', [DateTool.latestDay(30), DateTool.nowTime()]);
});
</script>

<template>
  <div class="flex daily_and_month">
    <n-button
      type="primary"
      @click="clickFastDate"
    >
      {{ props.dateType === 'DAILY' ? '最近30天' : '最近12个月' }}
    </n-button>
    <n-date-picker
      v-model:value="selectedTime"
      type="datetimerange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :is-date-disabled="disableDayTimeFun"
      :default-time="['00:00:00', '23:59:59']"
    />
    <!-- <n-date-picker
      v-show="props.dateType !== 'DAILY'"
      v-model:value="selectedTime"
      type="monthrange"
      :is-date-disabled="disableMonthTimeFun"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    /> -->
  </div>
</template>

<style lang="scss">
.daily_and_month{
  .n-button{
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .n-date-picker{
    .n-input{
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
