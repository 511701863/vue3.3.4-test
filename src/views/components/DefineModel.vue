<script setup lang="ts">
defineOptions({
  name: 'Child'
});
//Old
// const props = defineProps<{
//   modelValue:number
// }>();
// const emits = defineEmits<{(evt:'update:modelValue', value:number):viod
// }>();

//NEW 注意 需要在vite内引入 defineModel (因为还是beat功能)
const modelValue = defineModel<number>({ default: 0 });

</script>

<template>
  <div class="text-large text-red-500">
    vue-definedModel {{ modelValue }}
    <!-- <n-button
      size="small"
      @click="emits('update:modelValue',props.modelValue + 1)"
    >
      ChildBtn
    </n-button> -->
    <n-button
      size="small"
      @click="modelValue++"
    >
      ChildBtn
    </n-button>
  </div>
</template>
