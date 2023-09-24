import type { Player } from '@/interfaces/player'
import { defineStore } from 'pinia'
import { generateName } from '@/utils/names-gen'

interface State {
  players: Player[]
  runningGame: boolean
}

export const appWarStore = defineStore('war', {
  state: (): State => ({
    runningGame: false,
    players: [
      {
        name: 'Jose',
        hasTurn: false,
        stamina: 100,
        onStrike: false
      },
      {
        name: 'Pabloide',
        hasTurn: false,
        onStrike: false,
        stamina: 100
      }
    ]
  }),
  getters: {
    isRunning: (state) => state.runningGame,
    oneStriking: (state) => state.players.some((p) => p.onStrike),
    currentPlayer: (state) => state.players.find((p) => p.hasTurn),
    currentStriker: (state) => state.players.find((p) => p.onStrike),
    oneSurvivor: (state) => state.players.filter((p) => p.stamina > 0).length == 1,
  },
  actions: {
    heal(index: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == index ? { ...player, stamina: player.stamina + 20, hasTurn: false } : player
          )
        ]
      })
      this.nextPlayer(index + 1)
    },
    attack(targetName: string) {
      const striker = this.players.find((p) => p.onStrike) as Player

      this.$patch({
        players: [
          ...this.players.map((player) => {
            let result = player;
            if (player.name == striker.name) {
              result = { ...player, onStrike: false, hasTurn: false }
            }
            if (player.name == targetName) {
              result = { ...player, stamina: player.stamina - 20 }
            }
            return result
          })
        ]
      })
      this.nextPlayer(this.$state.players.findIndex(player => player.name == striker.name) + 1 )
    },
    randomizeNewPlayer() {
      const randomName = generateName()
      const newPlayer: Player = {
        name: randomName,
        stamina: randomName.includes('Messi') ? 100000 : 20,
        hasTurn: false,
        onStrike: false
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
      if(this.oneSurvivor){
        this.players = this.players.map((p) => ({ ...p, hasTurn: false }))
        return;
      }
      const index = sourceIndexPlayer % this.$state.players.length

      if(this.players[index].stamina <= 0){
        this.nextPlayer(index + 1)
        return;
      }

      this.$patch({
        players: [
          ...this.players.map((p, i) => (i == index ? { ...p, hasTurn: true } : p ))
        ]
      })
    },
    startAttack(id: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == id ? { ...player, onStrike: true } : player
          )
        ]
      })
    }
  }
})
