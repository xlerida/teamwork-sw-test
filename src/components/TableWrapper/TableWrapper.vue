<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
} from 'vue';

import { useStore } from 'vuex';
import { TableGetters } from '@/store/Table/getters';
import { TableMutations } from '@/store/Table/mutations';

import { COLUMNS_NAMES } from '@/constants/table.const';
import { CHARACTER_KEYS } from '@/constants/swapi.const';

import orderBy from 'lodash/orderBy';

import TableLoader from '@/components/TableLoader/TableLoader.vue';
import TableDataCell from '@/components/TableDataCell/TableDataCell.vue';
import TableNoResults from '@/components/TableNoResults/TableNoResults.vue';

export default defineComponent({
  name: 'TableWrapper',

  components: {
    TableLoader,
    TableDataCell,
    TableNoResults,
  },

  props: {
    tableData: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters[TableGetters.GetIsLoading]);
    const filterBy = computed(() => store.getters[TableGetters.GetFilterBy]);
    const localData = computed(() => store.getters[TableGetters.GetLocalData]);

    const sortStatus = ref('asc');
    const sortedColumn = ref();

    const onClick = (key: string) => {
      const switchSortStatus = sortStatus.value === 'asc' ? 'desc' : 'asc';
      store.commit(TableMutations.SetLocalData, orderBy(localData.value, key, switchSortStatus));
      sortStatus.value = switchSortStatus;
      sortedColumn.value = key;
    };

    watch([isLoading, filterBy], () => {
      sortedColumn.value = '';
    });

    return {
      COLUMNS_NAMES,
      CHARACTER_KEYS,
      isLoading,
      sortStatus,
      sortedColumn,
      onClick,
    };
  },
});
</script>

<template>
  <table class="TableWrapper">
    <caption class="TableWrapper__caption">Star Wars</caption>
    <tr
      class="TableWrapper__columns"
      v-if="isLoading || tableData.length"
    >
      <th
        class="TableWrapper__columns__column"
        :class="{ 'disabled': key === CHARACTER_KEYS.homeworld }"
        v-for="(columnName, key) in COLUMNS_NAMES"
        :key="key"
        @click="onClick(key)"
      >
        {{ columnName }}

        <span
          class="TableWrapper__columns__column__sort-arrow"
          v-if="key === sortedColumn"
        >
          {{ sortStatus === 'asc' ? '⬆' : '⬇' }}
        </span>
      </th>
    </tr>

    <TableLoader v-if="isLoading" />

    <tr
      class="TableWrapper__row"
      :class="{ 'vertical-align': tableData.length === 1 }"
      v-else
      v-for="character in tableData"
      :key="character"
    >
      <TableDataCell
        v-for="(value, key) in character"
        :key="value"
        :data="{ value, key }"
      />
    </tr>

    <TableNoResults v-if="!isLoading && !tableData.length" />
  </table>
</template>

<style lang="scss" scoped>
  @import "./TableWrapper.scss";
</style>
