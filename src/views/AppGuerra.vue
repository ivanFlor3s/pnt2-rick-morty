<template>
    <div class="row">
        <div class="col-12">
            Turno de : 
        </div>
    </div>

    <!-- <div class="row m-5" v-if="!juegoActivo">
        <h1 class="text-center">
            El ganador es
        </h1>
    </div> -->
    <button class="btn btn-success mb-3" @click="warStore.randomizeNewPlayer()"> Randomize New Player </button>
    <div id="war-container" class="d-flex flex-wrap gap-3 ">
        <GuerraPlayer v-for="player,i in warStore.$state.players" :player="player" :id="i" :key="i" >
        </GuerraPlayer>
    </div>
    <h1>
        {{ doubleValue }}
    </h1>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import JSConfetti from 'js-confetti'
import type { Player } from '@/interfaces/player';
import GuerraPlayer from '@/components/GuerraPlayer.vue';
import { useCounterStore, appWarStore  } from '@/core';

const jsConfetti = new JSConfetti()

const store = useCounterStore()
const warStore = appWarStore()

const doubleValue = computed(() => store.doubleCount)



onMounted(() => {

});

</script>