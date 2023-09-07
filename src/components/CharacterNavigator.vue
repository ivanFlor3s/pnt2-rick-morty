<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
    currentId: number;
}
const props = defineProps<Props>()

</script>

<template>
    <div class="d-flex justify-content-between">
        <RouterLink 
            :to="{name: 'character', params:{id: Number(props.currentId )- 1}}" 
            class="btn btn-outline-primary"
            v-show="props.currentId > 1">
            <i class="fa-solid fa-angles-left"></i>
        </RouterLink>
        <RouterLink :to="{name: 'character', params:{id: Number(props.currentId) + 1}}" class="btn btn-outline-primary" > 
            <i class="fa-solid fa-angles-right"></i>
        </RouterLink>
    </div>
</template>