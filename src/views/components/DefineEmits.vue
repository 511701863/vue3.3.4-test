<script setup lang="ts" generic="T">
//Old
// const emits = defineEmits<
// {(evt:'clickBtn', value:string):void
// }>();
//New
const emits = defineEmits<{
  'clickBtn':[value:string]
}>();
</script>

<template>
  <div class="text-large text-greed-500">
    DefineEmits
    <n-button @click="emits('clickBtn','发送的事件------->')">
      发送事件
    </n-button>
  </div>
</template>
