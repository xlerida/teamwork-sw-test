<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { TableGetters } from '@/store/Table/getters';
import startCase from 'lodash/startCase';
import { TableMutations } from '@/store/Table/mutations';

export default defineComponent({
  name: 'TableModal',

  setup() {
    const store = useStore();
    const modalData = computed(() => store.getters[TableGetters.GetModalData]);

    const {
      name,
      climate,
      diameter,
      population,
    } = modalData.value;

    // 1) Add commas ',' to miles and title case strings

    const getValue = (value: string) => {
      const isNumeric = /\d/.test(value);
      const addCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return isNumeric ? addCommas : startCase(value);
    };

    // 2) When clicking the X, empty the modal data from state

    const onClick = () => store.commit(TableMutations.SetModalData, {});

    return {
      name,
      climate,
      diameter,
      population,
      getValue,
      onClick,
    };
  },
});
</script>

<template>
  <div class="TableModal">
    <span
      class="TableModal__close"
      @click="onClick"
    >
      ❌
    </span>
    <div class="row align-center center">
      <span class="TableModal__planet-icon">
        {{ name === 'unknown' ? '❓' : '🌎' }}
      </span>
      <h2 class="TableModal__planet-name">
        {{ getValue(name) }}
      </h2>
    </div>

    <div class="TableModal__info row between">
      <div>
        <h2>🌤 Climate</h2>
        <h3>{{ getValue(climate) }}</h3>
      </div>

      <div>
        <h2>📐 Diameter</h2>
        <h3>{{ getValue(diameter) }}</h3>
      </div>

      <div>
        <h2>🙋 Population</h2>
        <h3>{{ getValue(population) }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./TableModal.scss";
</style>
