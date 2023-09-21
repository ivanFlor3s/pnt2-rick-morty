<template>
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      aria-label="Example with label"
      :class="{
        'bg-warning': percent > 40 && percent < 79,
        'bg-danger': percent > 0 && percent < 39,
        'bg-primary': percent > 80
      }"
      :style="{ width: percent + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  total: number
  current: number
}
const props = defineProps<Props>()
const percent = computed(() => {
  return (props.current * 100) / props.total
})
</script>
