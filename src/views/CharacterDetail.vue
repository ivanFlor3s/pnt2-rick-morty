<script setup lang="ts">
import { getCharacter } from '@/utils/api-provider';
import { ref, watch } from 'vue';
import { CharacterResult } from '../interfaces/api-response';
import CharacterNavigator  from '../components/CharacterNavigator.vue';
import { RouterLink } from 'vue-router';

interface Props {
    id: number;
}
const props = defineProps<Props>()
const character = ref<CharacterResult>();

 getCharacter(props.id).then((data) => {
     character.value = data;
 });

watch(() => props.id, (id:number) => {
    getCharacter(id).then((data) => {
        character.value = data;
    });
});

</script>
<template>
    <div class="card mt-4 overflow-hidden" v-if="character">
        <div class="card-header">
            <p class="mb-0">Character {{ character.id }}</p>
            <h1 style="font-size: 3rem;">{{ character.name }}</h1>
        </div>
        <div class="d-flex flex-column flex-md-row">
            <img :src="character.image" :alt="character.name">
            <div class="card-body">
                <h3>Datos personaje</h3>
                <p>Status:
                    <span class="badge bg-success">{{ character.status }}</span>
                </p>
                <p>Specie: <span class="fw-bold">{{ character.species }}</span></p>
                <hr>
                <h4>Episodios</h4>
                <div class="d-flex flex-wrap gap-2"> 
                    <RouterLink v-for="(ep, index) in character.episode" :to="{ name: 'episode', params:{ id: ep.split('/').pop()} }"
                        :key="index"
                        class="btn btn-outline-primary">
                    {{ ep.split('/').pop() }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
    <CharacterNavigator :current-id="props.id" class="mt-3"></CharacterNavigator>
</template>