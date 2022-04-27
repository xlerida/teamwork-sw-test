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

import { BUTTON_ACTIONS } from '@/constants/table.const';

export default defineComponent({
  name: 'TableButton',

  props: {
    action: {
      type: Number,
      required: true,
    },
  },

  setup({ action }) {
    const store = useStore();
    const isLoading = computed(() => store.getters[TableGetters.GetIsLoading]);
    const apiPagination = computed(() => store.getters[TableGetters.GetApiPagination]);
    const isDisabled = ref(true);

    const onClick = () => store.commit(TableMutations.SetCurrentPage, action);

    watch(apiPagination, ({ previous, next }) => {
      if (next && action === BUTTON_ACTIONS.increase) {
        isDisabled.value = false;
      } else if (!next && action === BUTTON_ACTIONS.increase) {
        isDisabled.value = true;
      } else if (!previous && action === BUTTON_ACTIONS.decrease) {
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }
    });

    return {
      BUTTON_ACTIONS,
      isDisabled,
      isLoading,
      onClick,
    };
  },
});
</script>

<template>
  <button
    class="TableButton"
    :class="{ 'disabled': isDisabled || isLoading }"
    @click="onClick()"
  >
    {{ action === BUTTON_ACTIONS.decrease ? '⬅️' : '➡️' }}
  </button>
</template>

<style lang="scss" scoped>
  @import "./TableButton.scss";
</style>
