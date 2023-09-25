<template>
  <div
    class="card"
    :class="{ 'opStyle': isOp }"
  >
    <div
      class="card-body"
      style="min-width: 250px"
    >
      <div class="d-flex justify-content-between">
        <div class="div">
          <h5 class="card-title">{{ player.name }}</h5>
          <p class="card-text">Stamina: {{ player.stamina }}</p>
        </div>
        <div class="d-flex flex-column gap-2">
          <span class="badge rounded-pill text-bg-success">
            <i class="fa-solid fa-heart-circle-plus"></i>
            {{ player.healPower[0] }}-{{ player.healPower[1] }}
          </span>
          <span class="badge rounded-pill text-bg-danger"
            ><i class="fa-solid fa-hand-back-fist"></i> {{ player.force[0] }}-
            {{ player.force[1] }}</span
          >
        </div>
      </div>
      <StaminaBar
        class="my-4"
        :current="Math.max(player.stamina, 0)"
        :total="totalStamina"
      ></StaminaBar>
      <div
        class="d-flex gap-4"
        v-if="player.hasTurn"
      >
        <button
          class="btn btn-outline-danger"
          @click="startAttack()"
        >
          <i class="fa-solid fa-spoon fs-2"></i>
          <span>Cucharaso</span>
        </button>
        <button class="btn">
          <i
            class="fa-solid fa-house-medical text-success fs-2"
            @click="heal()"
          ></i>
        </button>
        <button
          class="btn"
          v-if="!player.hasSwapped"
        >
          <i
            class="fa-solid fa-rotate fs-2"
            style="color: blueviolet"
            @click="startSwap()"
          ></i>
        </button>
        <div
          class="text-muted"
          v-if="player.hasSwapped"
        >
          <span>Ya swapeo</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Player } from '../interfaces/player'
import { onMounted, ref, computed } from 'vue'
import StaminaBar from './StaminaBar.vue'
import { appWarStore } from '@/core'
import { WarActionType } from '../core/war-actions.enum'
interface Props {
  player: Player
  id: number
}

const props = defineProps<Props>()
const totalStamina = ref<number>(0)
const warStore = appWarStore()
const isOp = computed(() => props.player.stamina > 10000)

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
<style>
.opStyle {
  background: url('https://media.tenor.com/qsvNX-PZDLkAAAAC/simpsons-jewels.gif');
  background-size: cover;
}
</style>
