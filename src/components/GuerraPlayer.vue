<template>
    <div class="card">
        <div class="card-body">
            <div v-if="player.hasTurn" class="end-0 m-2 position-absolute spinner-grow text-primary top-0 " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h5 class="card-title">{{ player.name }}</h5>
            <p class="card-text">{{ player.stamina }}</p>
            <img class="m-3" v-show="player.stamina > 10000"
                src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">

            <div class="d-flex gap-3" v-if="player.hasTurn">
                <button class="btn btn-danger">Lastimar</button>
                <button class="btn btn-success">Curarse</button>
                <button class="btn btn-outline-primary">Vivir de angular</button>
            </div>
            <div class="d-flex gap-4">
                <button class="btn btn-outline-danger">
                    <i class="fa-solid fa-spoon fs-2"></i>
                    <span>Cucharaso</span>
                </button>
                <button class="btn">
                    <i class="fa-solid fa-house-medical text-success fs-2"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type Player } from '../interfaces/player';
interface Props {
    player: Player
    id: number
}

const props = defineProps<Props>();


</script>