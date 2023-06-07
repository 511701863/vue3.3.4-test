<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {
  BarChart,
  PieChart,
  LineChart,
  PictorialBarChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  PolarComponent,
  GraphicComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

interface Props {
  data?: any,
}
const props = withDefaults(defineProps<Props>(), {
  data: {}
});
const chart:any = shallowRef(null);
const refOption = reactive({
  id: Math.random().toString()
});
const { id } = toRefs(refOption);
watch(() => props.data, (val) => {
  chart.value.clear();
  chart.value.setOption(props.data);
});
onMounted(() => {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    PieChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    LegendComponent,
    PolarComponent,
    PictorialBarChart,
    GraphicComponent
  ]);

  chart.value = echarts.init(document.getElementById(id.value) as HTMLElement);
  chart.value.setOption(props.data);

  window.addEventListener('resize', () => {
    chart.value.resize();
  });
});
defineExpose({
  chart
});
</script>

<template>
  <div
    :id="id"
    v-bind="$attrs"
    class="w-full h-full"
  ></div>
</template>

<style lang="scss" scoped></style>
