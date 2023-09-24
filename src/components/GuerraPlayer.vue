<template>
    <div class="card" >
        <div class="card-body" style="min-width: 250px;">
            <div v-if="player.hasTurn" class="end-0 m-2 position-absolute spinner-grow text-primary top-0 " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h5 class="card-title">{{ player.name }}</h5>
            <p class="card-text">{{ player.stamina }} / {{ totalStamina }}</p>
            <StaminaBar class="mb-4" :current="player.stamina" :total="totalStamina" ></StaminaBar>
            <img class="m-3" v-show="player.stamina > 10000"
                src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">
            <div class="d-flex gap-4" v-if="player.hasTurn">
                <button class="btn btn-outline-danger" @click="startAttack()">
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
import { onMounted, ref } from 'vue';
import StaminaBar from './StaminaBar.vue'
import { appWarStore } from '@/core';
interface Props {
    player: Player
    id: number
}

const props = defineProps<Props>();
const totalStamina = ref<number>(0)
const warStore = appWarStore()

onMounted(() => {
    totalStamina.value = props.player.stamina
})

const startAttack = () => {
    warStore.startAttack(props.id)
}

</script>