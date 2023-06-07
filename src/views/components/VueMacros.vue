<script setup lang="ts">
const { modelValue, text } = defineModels<{
  modelValue:number,
  text:string
}>();
</script>

<template>
  <div class="text-large text-green-500">
    VueMacros {{ modelValue }}
    <!-- <n-button
      size="small"
      @click="emits('update:modelValue',props.modelValue + 1)"
    >
      ChildBtn
    </n-button> -->
    <Icon
      name="logo"
      size="36"
    />
    <n-button
      size="small"
      @click="modelValue++"
    >
      ChildBtn2
    </n-button>
    <n-input v-model:value="text" />
  </div>
</template>
