<script setup lang="ts" generic="T">
//通过传入的datalist的类型推断出组件的泛型generic : T 从而约束插槽data的类型，也使组件外可以获取插槽值的类型提示
const props = defineProps<{
  dataList:T[]
}>();
//为插槽提供类型提示和约束
defineSlots<{
  custom(props:{data:T}):any,
  default(props:any):any
}>();

</script>

<template>
  <div class="text-large text-pink-300">
    DefineSlots
    <div>
      插槽左<slot></slot>插槽右
    </div>
    <div>
      具名插槽<slot
        name="custom"
        :data="dataList[0]"
      ></slot>
    </div>
  </div>
</template>
