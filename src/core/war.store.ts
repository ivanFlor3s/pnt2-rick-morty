import type { Player } from '@/interfaces/player'
import { defineStore } from 'pinia'
import { generateName } from '@/utils/names-gen'
import { WarActionType } from './war-actions.enum'

interface State {
  players: Player[]
  runningGame: boolean
  actionExecuting: WarActionType | null
}

export const appWarStore = defineStore('war', {
  state: (): State => ({
    runningGame: false,
    players: [
      {
        name: 'Jose',
        hasTurn: false,
        stamina: 100,
        executingAction: false,
        hasSwapped: false
      },
      {
        name: 'Pabloide',
        hasTurn: false,
        executingAction: false,
        stamina: 100,
        hasSwapped: false
      }
    ],
    actionExecuting: null
  }),
  getters: {
    isRunning: (state) => state.runningGame,
    oneStriking: (state) => state.players.some((p) => p.executingAction),
    currentPlayer: (state) => state.players.find((p) => p.hasTurn),
    currentStriker: (state) => state.players.find((p) => p.executingAction),
    oneSurvivor: (state) =>
      state.players.filter((p) => p.stamina > 0).length == 1,
    executing: (state) => state.actionExecuting
  },
  actions: {
    heal(index: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == index
              ? { ...player, stamina: player.stamina + 20, hasTurn: false }
              : player
          )
        ]
      })
      this.nextPlayer(index + 1)
    },
    attack(targetName: string) {
      const striker = this.players.find((p) => p.executingAction) as Player
      const victim = this.players.find((p) => p.name == targetName) as Player
      const swapping = this.executing == WarActionType.SWAP
      this.$patch({
        players: [
          ...this.players.map((player) => {
            let result = player
            //Striker
            if (player.name == striker.name) {
              // if(this.executing == WarActionType.SWAP){

              // }
              result = {
                ...player,
                executingAction: false,
                hasTurn: false,
                stamina:
                  swapping
                    ? victim.stamina
                    : player.stamina,
                hasSwapped: swapping
              }
            }
            //Victim
            if (player.name == targetName) {
              result = { ...player, stamina: swapping ? striker.stamina : player.stamina - 20 }
            }
            return result
          })
        ]
      })

      this.nextPlayer(
        this.$state.players.findIndex((player) => player.name == striker.name) +
          1
      )
    },
    randomizeNewPlayer() {
      const randomName = generateName()
      const newPlayer: Player = {
        name: randomName,
        stamina: randomName.includes('Messi') ? 100000 : 20,
        hasTurn: false,
        executingAction: false,
        hasSwapped: false
      }
      this.$patch({
        players: [...this.players, newPlayer]
      })
    },
    startWar() {
      this.$patch({
        runningGame: true,
        players: [
          ...this.players.map((p, i) => (i == 0 ? { ...p, hasTurn: true } : p))
        ]
      })
    },
    nextPlayer(sourceIndexPlayer: number) {
      if (this.oneSurvivor) {
        this.players = this.players.map((p) => ({ ...p, hasTurn: false }))
        return
      }
      const index = sourceIndexPlayer % this.$state.players.length

      if (this.players[index].stamina <= 0) {
        this.nextPlayer(index + 1)
        return
      }

      this.$patch({
        players: [
          ...this.players.map((p, i) =>
            i == index ? { ...p, hasTurn: true } : p
          )
        ]
      })
    },
    startAction(id: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == id ? { ...player, executingAction: true } : player
          )
        ]
      })
    },
    startSwap(id: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == id ? { ...player, executingAction: true } : player
          )
        ]
      })
    },
    setAction(action: WarActionType) {
      this.$patch({
        actionExecuting: action
      })
    }
  }
})
