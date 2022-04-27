<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from 'vuex';
import { TableMutations } from '@/store/Table/mutations';

import { CHARACTER_KEYS } from '@/constants/swapi.const';

import capitalize from 'lodash/capitalize';
import moment from 'moment';

export default defineComponent({
  name: 'TableDataCell',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup({ data }) {
    const store = useStore();
    const { value, key } = data;

    // 1) If the data type is a date, a homeworld or unknown, the value of the cell is transformed

    const isDate = key === CHARACTER_KEYS.created || key === CHARACTER_KEYS.edited;
    const isHomeworld = key === CHARACTER_KEYS.homeworld;
    const isUnknown = value === 'unknown';

    const getValue = () => {
      let transformedValue = '';

      if (isDate) {
        transformedValue = moment(value).format('MM/DD/YYYY');
      } else if (isHomeworld) {
        transformedValue = capitalize(value.name);
      } else if (isUnknown) {
        transformedValue = capitalize(value);
      }

      return isDate || isHomeworld || isUnknown ? transformedValue : value;
    };

    // 2) When a homeworld name is clicked

    const onClick = () => {
      if (isHomeworld) {

        // 3) Store the homeworld value as the current modal data

        store.commit(TableMutations.SetModalData, value);
      }
    };

    return {
      isHomeworld,
      isUnknown,
      getValue,
      onClick,
    };
  },
});
</script>

<template>
  <td
    class="TableDataCell"
    :class="[{
      'disabled': isUnknown && isHomeworld,
      'cursor-pointer': isHomeworld,
    }]"
    @click="onClick"
  >
    {{ getValue() }}
  </td>
</template>

<style lang="scss" scoped>
  @import "./TableDataCell.scss";
</style>
