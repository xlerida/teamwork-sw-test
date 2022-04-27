<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TableNoResults',
});
</script>

<template>
  <div class="TableNoResults">
    <p class="TableNoResults__monkey">
      🙈
    </p>
    <p class="TableNoResults__paragraph">
      Not the wookie you're looking for...
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @import "./TableNoResults";
</style>
