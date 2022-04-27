<script lang="ts">
import { TableGetters } from '@/store/Table/getters';
import { TableMutations } from '@/store/Table/mutations';
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import filter from 'lodash/filter';

export default defineComponent({
  name: 'TableFilter',

  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters[TableGetters.GetIsLoading]);
    const currentPage = computed(() => store.getters[TableGetters.GetCurrentPage]);
    const filterBy = computed(() => store.getters[TableGetters.GetFilterBy]);
    const unfilteredLocalData = computed(() => store.getters[TableGetters.GetUnfilteredLocalData]);
    const localData = computed(() => store.getters[TableGetters.GetLocalData]);

    const onInput = (event: any) => {
      store.commit(TableMutations.SetFilterBy, event.target.value.toLowerCase());

      const getFilteredCharacters = () => filter(localData.value, ({ name }) => name.toLowerCase().includes(filterBy.value));

      store.commit(TableMutations.SetLocalData, unfilteredLocalData.value);

      if (filterBy.value.length) {
        store.commit(TableMutations.SetLocalData, getFilteredCharacters());
      }
    };

    watch(currentPage, () => store.commit(TableMutations.SetFilterBy, ''));

    return {
      isLoading,
      filterBy,
      onInput,
    };
  },
});
</script>

<template>
  <input
    class="TableFilter"
    :class="{ 'disabled': isLoading }"
    placeholder="Search by name..."
    type="text"
    v-model="filterBy"
    @input="onInput"
  >
</template>

<style lang="scss" scoped>
  @import "./TableFilter.scss";
</style>
