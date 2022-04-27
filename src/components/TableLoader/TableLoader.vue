<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TableLoader',
});
</script>

<template>
  <div class="TableLoader">
    <p class="TableLoader__magnifying-glass">
      🔎
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @import "./TableLoader.scss";
</style>
