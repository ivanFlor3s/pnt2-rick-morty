<script setup lang="ts">
import { ref } from 'vue';
import { EpisodeApiResponse } from '../interfaces/api-response';
import { getEpisode } from '../utils/api-provider';

interface Props {
    id: number;
}

const props = defineProps<Props>()
const episode = ref<EpisodeApiResponse>()

getEpisode(props.id).then((data) => {
    episode.value = data;
});

</script>

<template>
    <h2>Episodio</h2>
    <hr>
    <div v-if="episode">
        <p>Name: {{ episode.name }}</p>
        <p>Air Date: {{ episode.air_date }}</p>
        <p>Episode: {{ episode.episode }}</p>
        <hr>
        <h4>Characters</h4>
        <div class="d-flex flex-wrap gap-2">
            <RouterLink v-for="(character, index) in episode.characters" :to="{ name: 'character', params:{ id: character.split('/').pop()}}"
                :key="index"
                class="btn btn-outline-primary">
                {{ character.split('/').pop() }}
            </RouterLink>
        </div>
    </div>
</template>