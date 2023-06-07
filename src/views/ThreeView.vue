<script setup lang="ts">
import DefineModel from './components/DefineModel.vue';
import VueMacros from './components/VueMacros.vue';
import DefineSlots from './components/DefineSlots.vue';
import DefineEmits from './components/DefineEmits.vue';
defineOptions({
  name: 'ThreeView'
});

const value = ref(50);
const disabled = ref(true);
const childValue = ref(20);
const marcosText = ref('test String');
type DataListItem = {
  a:number,
  b:boolean,
  c:string
}
const dataList:DataListItem[] = [{ a: 1, b: true, c: 'string' }];
function clickBtnFn(value:string) {
  (document.querySelector('#emitDiv') as Element).innerHTML = value;
}
</script>

<template>
  <div class="text-large text-blue-500">
    <n-space vertical>
      <n-slider
        v-model:value="childValue"
        :step="10"
      />
      <n-input-number
        v-model:value="childValue"
        size="small"
      />
      <n-space
        item-style="display: flex;"
        align="center"
      >
        <n-checkbox v-model:checked="value">
          复选框
        </n-checkbox>
        <n-checkbox v-model:checked="value" />
        <n-checkbox
          v-model:checked="value"
          :disabled="disabled"
        >
          复选框
        </n-checkbox>
        <n-button
          size="small"
          @click="disabled = !disabled"
        >
          禁用
        </n-button>
        <n-rate
          readonly
          :default-value="3"
        />
      </n-space>
      <n-switch v-model:value="disabled" />
    </n-space>
    <DefineModel v-model="childValue" />

    <div>
      VueMacros-defineModels的文字{{ marcosText }}
    </div>
    <VueMacros
      v-model="childValue"
      v-model:text="marcosText"
    />
    <DefineSlots :data-list="dataList">
      <template #default>
        <div>
          插槽内容
        </div>
      </template>
      <template #custom="{data}">
        <div>
          custom插槽内容 {{ data.a.toFixed(2) }}
        </div>
      </template>
    </DefineSlots>
    <DefineEmits @click-btn="clickBtnFn" />
    <div id="emitDiv"></div>
    <!-- <DefineSlots :data-list="[1,2]">
      <template #default>
        <div>
          插槽内容
        </div>
      </template>
      <template #custom="{data}">
        <div>
          custom插槽内容 {{ data.toFixed(2) }}
        </div>
      </template>
    </DefineSlots> -->
  </div>
</template>
<style lang="scss" scoped>
</style>
