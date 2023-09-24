<template>
  <div class="d-flex mb-3">
    <button
      class="btn btn-primary"
      @click="warStore.startWar()"
    >
      <i class="fa fa-solid fa-play mr-2"></i>
      Iniciar Juego
    </button>
  </div>

  <button
    class="btn btn-success mb-3"
    @click="warStore.randomizeNewPlayer()"
  >
    Randomize New Player
  </button>
  <div
    id="war-container"
    class="d-flex flex-wrap gap-3"
  >
    <GuerraPlayer
      v-for="(player, i) in warStore.$state.players"
      :class="{
        'animate__animated animate__pulse animate__infinite cursor-pointer':
        warStore.isRunning && !player.onStrike && warStore.oneStriking && player.stamina > 0
      }"
      :player="player"
      :id="i"
      :key="i"
      @click="attack(player.name)"
    >
    </GuerraPlayer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import JSConfetti from 'js-confetti'
import GuerraPlayer from '@/components/GuerraPlayer.vue'
import { useCounterStore, appWarStore } from '@/core'

const jsConfetti = new JSConfetti()

const store = useCounterStore()
const warStore = appWarStore()

const doubleValue = computed(() => store.doubleCount)

const attack = (targetName: string) => {
  const attackToSelf = targetName === warStore.currentStriker?.name;
  const noOneAtacking = !warStore.oneStriking;
  const targetEmptyStamina = warStore.$state.players.find(player => player.name === targetName)?.stamina === 0;
  if( attackToSelf || noOneAtacking || targetEmptyStamina ) return;
  warStore.attack(targetName)
}

onMounted(() => {})
</script>
