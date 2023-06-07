<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { getOffsetTopByBody } from '@/utils/index';

interface Props {
  data: Record<string, any>[];
  columns: DataTableColumns;
  tableTitle?: string;
  maxHeightProps?: number;
  showPagination?: boolean;
  showTitle?: boolean;
  isInitial?: boolean
}

const pagination = reactive({
  pageIndex: 1,
  pageSize: 10,
  itemCount: 0
});

const pageSizes = [
  {
    label: '10/页',
    value: 10
  },
  {
    label: '20/页',
    value: 20
  },
  {
    label: '50/页',
    value: 50
  },
  {
    label: '100/页',
    value: 100
  }
];

const maxHeight = ref(0);
const nxTable = ref();

const props = withDefaults(defineProps<Props>(), {
  tableTitle: '',
  maxHeightProps: 0,
  showPagination: true,
  showTitle: true,
  isInitial: true
});

const emits = defineEmits(['search']);
if(props.isInitial) {
  emits('search', pagination);
}
onMounted(() => {
  getTableHeight();
});

const getTableHeight = () => {
  if(props.maxHeightProps) {
    maxHeight.value = props.maxHeightProps;
    return;
  }
  const offsetTop = getOffsetTopByBody(document.querySelector('#nxTable') as HTMLElement);
  const windowHeight = document.documentElement.clientHeight;
  maxHeight.value = windowHeight - offsetTop - 60 - 12 - 56;
};

const pageCurrent = (info:number) => {
  pagination.pageIndex = info;
  emits('search', pagination);
};

const pageSizeCurrent = (info:number) => {
  pagination.pageIndex = 1;
  pagination.pageSize = info;
  emits('search', pagination);
};

const search = (pageIndex:number) => {
  if (pageIndex) {
    pagination.pageIndex = pageIndex;
  }
  emits('search', pagination);
};

defineExpose({
  search,
  pagination
});

</script>

<template>
  <div>
    <div
      v-if="showTitle"
      class="mb-small flex items-center justify-between"
    >
      <div
        class="nx--title"
      >
        {{ tableTitle }}
      </div>
      <slot name="operate"></slot>
    </div>
    <n-data-table
      v-bind="$attrs"
      id="nxTable"
      ref="nxTable"
      :columns="columns"
      :data="data"
      :max-height="maxHeight"
      striped
    />
    <n-pagination
      v-if="showPagination"
      v-model:page="pagination.pageIndex"
      v-model:page-size="pagination.pageSize"
      :item-count="pagination.itemCount"
      show-size-picker
      :page-sizes="pageSizes"
      class="flex justify-end mt-normal"
      @update:page="pageCurrent"
      @update:page-size="pageSizeCurrent"
    >
      <template #prefix="{ itemCount }">
        共 {{ itemCount }} 条
      </template>
    </n-pagination>
  </div>
</template>

<style></style>
