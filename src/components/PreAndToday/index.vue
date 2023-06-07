<script lang="ts" setup>
import DateTool from '@/utils/date';
const emits = defineEmits(['changeTime']);
const refOption = reactive({
  timeType: 'today',
  dateList: [
    { label: '当天', value: 'today' },
    { label: '前一天', value: 'pre' }
  ],
  startTime: DateTool.dayStartTime(),
  endTime: DateTool.dayEndTime()
});
const { startTime, endTime, timeType, dateList } = toRefs(refOption);

const changeTimeType = (e:string) => {
  timeType.value = e;
  if(timeType.value === 'today') {
    startTime.value = DateTool.dayStartTime();
    endTime.value = DateTool.dayEndTime();
  }else{
    startTime.value = DateTool.dayStartTime(new Date(DateTool.latestDay(1)));
    endTime.value = DateTool.dayEndTime(new Date(DateTool.latestDay(1)));
  }
  emitParams();
};
const updateStartTime = (e:any) => {
  startTime.value = e;
};
const updateEndTime = (e:any) => {
  endTime.value = e;
};
const emitParams = () => {
  emits('changeTime', { startTime: startTime.value, endTime: endTime.value });
};
</script>

<template>
  <div class="preAndToday flex mb-normal items-center justify-end">
    <n-radio-group
      v-model:value="timeType"
      @update-value="changeTimeType"
    >
      <n-radio-button
        v-for="item in dateList"
        :key="item.value"
        class="radio-button"
        :value="item.value"
        :label="item.label"
        :checked="timeType === item.value"
      />
    </n-radio-group>
    <n-time-picker
      v-model:value="startTime"
      class="start-picker"
      :actions="['now']"
      @blur="emitParams"
      @update-value="updateStartTime"
    />
    <span class="mx-small">-</span>
    <n-time-picker
      v-model:value="endTime"
      :actions="['now']"
      @blur="emitParams"
      @update-value="updateEndTime"
    />
  </div>
</template>

<style lang="scss">
.preAndToday{
  .n-radio-group{
    .radio-button{
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
  }
  .start-picker{
    .n-input__border{
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
