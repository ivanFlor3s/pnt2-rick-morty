<template>
  <div
    class="d-flex mb-3 gap-3 align-items-start"
    v-if="!warStore.isRunning"
  >
    <button
      class="btn btn-primary"
      @click="warStore.startWar()"
    >
      <i class="fa fa-solid fa-play mr-2"></i>
      Iniciar Juego
    </button>
    <button
      class="btn btn-success mb-3"
      @click="warStore.randomizeNewPlayer()"
    >
      Randomize New Player
    </button>
  </div>

  <div class="d-flex gap-4 align-items-start mb-5">
    <div
      id="war-container"
      class="d-flex flex-wrap gap-3 flex-fill"
    >
      <GuerraPlayer
        v-for="(player, i) in warStore.$state.players"
        :class="{
          'animate__animated animate__pulse animate__infinite cursor-pointer':
            warStore.isRunning &&
            !player.executingAction &&
            warStore.oneStriking &&
            player.stamina > 0
        }"
        :player="player"
        :id="i"
        :key="i"
        @click="attack(player.name)"
      >
      </GuerraPlayer>
    </div>
    <div v-if="warStore.showLogs">
      <h3>Logs</h3>
      <ul
        class="list-group"
        style="max-height: 350px; overflow-y: auto; min-width: 300px"
      >
        <li
          class="list-group-item"
          v-for="(elem, i) in warStore.logs"
          :key="i"
        >
          {{ elem }}
        </li>
      </ul>
    </div>
  </div>
  <div
    class="text-center"
    v-if="winner"
  >
    <h1 class="text-center fs-1">Ganador {{ winner }}</h1>
    <button class="btn btn-primary" @click="reset()">Volver a jugar</button>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import GuerraPlayer from '@/components/GuerraPlayer.vue'
import { appWarStore } from '@/core'
import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
const warStore = appWarStore()
const winner = ref<string>('')

const attack = (targetName: string) => {
  const attackToSelf = targetName === warStore.currentStriker?.name
  const noOneAtacking = !warStore.oneStriking
  const targetEmptyStamina =
    warStore.$state.players.find((player) => player.name === targetName)
      ?.stamina === 0
  if (attackToSelf || noOneAtacking || targetEmptyStamina) return
  warStore.execute(targetName)
}

const reset = () => {
  warStore.reset()
  winner.value = ''
}

watch(
  () => warStore.oneSurvivor,
  (value: boolean) => {
    if (value) {
      jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸']
      })
      winner.value =
        warStore.$state.players.find((player) => player.stamina > 0)?.name || ''
    }
  }
)
</script>
