<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
} from 'vue';

import { useStore } from 'vuex';
import { TableMutations } from '@/store/Table/mutations';
import { TableGetters } from '@/store/Table/getters';

import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';

import { ENDPOINTS } from '@/constants/swapi.const';
import { BUTTON_ACTIONS } from '@/constants/table.const';

import TableWrapper from '@/components/TableWrapper/TableWrapper.vue';
import TableModal from '@/components/TableModal/TableModal.vue';
import TableFilter from '@/components/TableFilter/TableFilter.vue';
import TableButton from '@/components/TableButton/TableButton.vue';

export default defineComponent({
  name: 'TableView',

  components: {
    TableWrapper,
    TableModal,
    TableFilter,
    TableButton,
  },

  setup() {
    const store = useStore();
    const apiData = ref();
    const currentPage = computed(() => store.getters[TableGetters.GetCurrentPage]);
    const localData = computed(() => store.getters[TableGetters.GetLocalData]);
    const modalData = computed(() => store.getters[TableGetters.GetModalData]);

    // 1) Fetch the characters data from the API whenever the current page changes

    watch(currentPage, (value) => {
      store.commit(TableMutations.SetIsLoading);

      fetch(`${ENDPOINTS.characters}/?page=${value}`)
        .then((response) => response.json())
        .then((data) => {
          apiData.value = data;

          store.commit(TableMutations.SetApiPagination, {
            previous: data.previous,
            next: data.next,
          });
        });
    }, { immediate: true });

    // 2) Once the characters data is retrieved

    watch(apiData, (value) => {
      const { results } = value;
      const homeworldsData: Record<string, string>[] = [];

      // 3) Loop through each character and store the homeworld endpoint index

      let homeworldsIndexes: string[] = [];
      each(results, ({ homeworld }) => homeworldsIndexes.push(homeworld.split('/').at(-2)));

      // 4) Remove duplicates from the homeworlds indexes array

      homeworldsIndexes = [...new Set(homeworldsIndexes)];

      // 5) Loop through each unique homeworld index and fetch its data from the API

      each(homeworldsIndexes, (index) => {
        fetch(`${ENDPOINTS.homeworlds}/${index}`)
          .then((response) => response.json())
          .then(({
            name,
            diameter,
            climate,
            population,
            url,
          }) => {

            // 6) Store the homeworld's required data

            homeworldsData.push({
              name,
              diameter,
              climate,
              population,
              url,
            });

            // 7) Map the homeworld's data into its corresponding character

            const localCharactersData: Record<string, string | Record<string, string>>[] = [];

            each(results, ({
              name,
              height,
              mass,
              created,
              edited,
              homeworld,
            }) => {
              each(homeworldsData, (homeworldData) => {
                if (homeworld === homeworldData.url) {
                  localCharactersData.push({
                    name,
                    height,
                    mass,
                    created,
                    edited,
                    homeworld: homeworldData,
                  });
                }
              });
            });

            // 8) Store the data only when the total amount of characters have been mapped

            if (localCharactersData.length === results.length) {
              store.commit(TableMutations.SetUnfilteredLocalData, localCharactersData);
              store.commit(TableMutations.SetLocalData, localCharactersData);
              store.commit(TableMutations.SetIsLoading, false);
            }
          });
      });
    });

    return {
      BUTTON_ACTIONS,
      currentPage,
      localData,
      modalData,
      isEmpty,
    };
  },
});
</script>

<template>
  <div class="TableView">
    <div
      class="TableView__overlay"
      v-show="!isEmpty(modalData)"
    />

    <TableModal v-if="!isEmpty(modalData)" />

    <TableWrapper
      :tableData="localData"
    />

    <div class="TableView__row">
      <TableButton :action="BUTTON_ACTIONS.decrease" />
      <TableFilter />
      <TableButton :action="BUTTON_ACTIONS.increase" />
    </div>
  </div>
</template>

<style lang="scss">
  @import "./TableView.scss";
</style>
