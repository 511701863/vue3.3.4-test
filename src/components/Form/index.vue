<script lang="ts" setup>
import { FormInst } from 'naive-ui';
import { FormConfig } from './types';

interface Props {
  data: Record<string, any>;
  config: FormConfig[];
  span?: string;
  labelWidth?: number;
  labelPlacement?: 'left' | 'top';
  formClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  span: '0:24 640:12 1024:8 1920:6',
  labelWidth: 120,
  labelPlacement: 'left',
  formClass: ''
});
const emits = defineEmits(['update:data']);

const model = toRefs(props).data;
watch(model.value, () => {
  emits('update:data', model.value);
}, { deep: true });

watch(props.data, () => {
  model.value = unref(props.data);
}, { deep: true });

const form = ref<FormInst>();

function validate() {
  return form.value?.validate();
}

function restoreValidation() {
  form.value?.restoreValidation();
}
function getItemBind(item:FormConfig) {
  return Object.assign({}, item.itemProps, item.itemListeners);
}
function getBind(item:FormConfig) {
  return Object.assign({}, item.props, item.type === 'component' ? item.listeners : {});
}
defineExpose({
  validate,
  restoreValidation
});

</script>
<template>
  <NForm
    ref="form"
    :model="model"
    inline
    label-align="right"
    class="nx-form mb-normal pb-mini border-b border-bColor"
    :class="formClass"
  >
    <NGrid
      :x-gap="24"
      :y-gap="12"
      :item-responsive="true"
    >
      <NGridItem
        v-for="item, index in config"
        :key="index"
        :span="item.hidden ? 0 : item.span || span"
      >
        <NFormItem
          :label="item.label"
          :path="item.key"
          v-bind="getItemBind(item)"
          :label-placement="labelPlacement"
        >
          <div class="w-full">
            <template v-if="item.type === 'slot'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-if="item.type === 'divider'">
              <div class="border-b border-bColor"></div>
            </template>
            <template v-if="item.type === 'innerText'">
              <div
                class="text-textInfo text-mini"
                :class="item.class"
              >
                {{ item.innerText }}
              </div>
            </template>
            <template v-if="item.type === 'component'">
              <!--
                Naive UI 的时间选择器有些特殊
                这里单独处理
                TT 表示毫秒级时间戳
                tt 表示秒级时时间戳
              -->
              <!-- <NDatePicker
                v-if="typeof item.component === 'string' && item.component === 'NDatePicker' || typeof item.component !== 'string' && item.component.name === 'DatePicker'"
                v-model:formatted-value="model[item.key]"
                :value-format="item?.props?.['value-format'] || 'TT'"
                v-bind="item.props"
                v-on="item.listeners"
              /> -->
              <Component
                :is="item.component"
                v-model:value="model[item.key]"
                v-model:modelValue="model[item.key]"
                v-bind="getBind(item)"
              >
                <template v-if="typeof item.component !== 'string' && item.component.name === 'RadioGroup'">
                  <n-radio-button
                    v-for="radio, radioIndex in item.options"
                    :key="radioIndex"
                    :value="radio.value"
                  >
                    {{ radio.label }}
                  </n-radio-button>
                </template>
                <template v-if="typeof item.component !== 'string' && item.component.name === 'CheckboxGroup'">
                  <NCheckbox
                    v-for="check, checkIndex in item.options"
                    :key="checkIndex"
                    :value="check.value"
                    :label="check.label"
                  />
                </template>
              </Component>
            </template>
            <div
              v-if="item.tips"
              class="text-mini mt-mini text-textInfo"
            >
              tips: {{ item.tips }}
            </div>
          </div>
        </NFormItem>
      </NGridItem>
    </NGrid>
  </NForm>
</template>
<style lang="scss">
  .nx-form{
    .n-image{
      img{
        width: 150px;
      }
    }
    .n-grid{
      gap: 12px!important;
    }
    .n-form-item-feedback-wrapper{
      min-height: 10px;
    }
  }
</style>
