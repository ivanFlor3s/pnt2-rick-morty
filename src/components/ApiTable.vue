<script setup lang="ts">
import { ref } from 'vue';
import { getCharacters } from '../utils/api-provider';
import type { Result } from '@/interfaces/api-response';
import { RouterLink } from 'vue-router';

const characters = ref<Result[]>([])

getCharacters().then((data) => {
  characters.value = data.results;
});

</script>

<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th></th>
            </tr>
        </thead>
        <tbody v-if="characters.length > 0">
            <tr v-for="character in characters" :key="character.id">
                <th scope="row">{{ character.id }}</th>
                <td>{{ character.name }}</td>
                <td> 
                    <RouterLink :to="{name: 'character', params:{ id: character.id}}"  class="text-primary">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </RouterLink>  
                </td>
            </tr>
        </tbody>
    </table>
</template>