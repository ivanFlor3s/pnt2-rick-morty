<template>
    <div class="progress">
        <div class="progress-bar" role="progressbar" aria-label="Example with label" 
        :style="{ width: percent + '%' }">
        </div>
    </div> 
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    total: number
    current: number
}
const props = defineProps<Props>()
const percent = computed(() => {
    return (props.current * 100) / props.total
    })
</script>
