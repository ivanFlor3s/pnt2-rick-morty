<template>
    <div class="card" >
        <div class="card-body" style="min-width: 250px;">
            <div v-if="player.hasTurn" class="end-0 m-2 position-absolute spinner-grow text-primary top-0 " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h5 class="card-title">{{ player.name }}</h5>
            <p class="card-text">Stamina: {{ player.stamina }}</p>
            <StaminaBar class="mb-4" :current="player.stamina" :total="totalStamina" ></StaminaBar>
            <img class="m-3" v-show="player.stamina > 10000"
                src="https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif" alt="homer">
            <div class="d-flex gap-4" v-if="player.hasTurn">
                <button class="btn btn-outline-danger" @click="startAttack()">
                    <i class="fa-solid fa-spoon fs-2"></i>
                    <span>Cucharaso</span>
                </button>
                <button class="btn">
                    <i class="fa-solid fa-house-medical text-success fs-2" @click="heal()"></i>
                </button>
                <button class="btn" v-if="!player.hasSwapped">
                    <i class="fa-solid fa-rotate fs-2" style="color: blueviolet;" @click="startSwap()"></i>
                </button>

                <div class="text-muted"  v-if="player.hasSwapped">
                    <span>Ya swapeo</span>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
import { type Player } from '../interfaces/player';
import { onMounted, ref } from 'vue';
import StaminaBar from './StaminaBar.vue'
import { appWarStore } from '@/core';
import { WarActionType } from '../core/war-actions.enum';
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
    warStore.startAction(props.id)
    warStore.setAction(WarActionType.ATTACK)
}
const startSwap = () => {
    warStore.startSwap(props.id)
    warStore.setAction(WarActionType.SWAP)
}
const heal = () => {
    warStore.heal(props.id)
}

</script>