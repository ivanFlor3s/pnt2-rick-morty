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
  <div class="d-flex gap-4 align-items-start mb-5">
    <div
      id="war-container"
      class="d-flex flex-wrap gap-3 flex-fill"
    >
      <GuerraPlayer
        v-for="(player, i) in warStore.$state.players"
        :class="{
          'animate__animated animate__pulse animate__infinite cursor-pointer':
          warStore.isRunning && !player.executingAction && warStore.oneStriking && player.stamina > 0
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
      <ul class="list-group" style="max-height: 350px; overflow-y: auto; min-width: 300px;">
        <li class="list-group-item" v-for="(elem, i) in warStore.logs" :key="i" >{{elem}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import GuerraPlayer from '@/components/GuerraPlayer.vue'
import { appWarStore } from '@/core'


const warStore = appWarStore()


const attack = (targetName: string) => {
  const attackToSelf = targetName === warStore.currentStriker?.name;
  const noOneAtacking = !warStore.oneStriking;
  const targetEmptyStamina = warStore.$state.players.find(player => player.name === targetName)?.stamina === 0;
  if( attackToSelf || noOneAtacking || targetEmptyStamina ) return;
  warStore.execute(targetName)
}

onMounted(() => {})
</script>
