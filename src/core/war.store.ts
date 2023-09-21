import type { Player } from '@/interfaces/player'
import { defineStore } from 'pinia'
import { generateName } from '@/utils/names-gen';

interface State {
  players: Player[]
}

export const appWarStore = defineStore('war', {
  state: (): State => ({
    players: [
      {
        name: 'Jose',
        hasTurn: false,
        stamina: 100
      },
      {
        name: 'Pabloide',
        hasTurn: false,
        stamina: 100
      }
    ]
  }),
  //   getters: {
  //     doubleCount: (state) => state.count * 2
  //   },
  actions: {
    heal(index: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == index ? { ...player, stamina: player.stamina + 20 } : player
          )
        ]
      })
    },
    attack(source: number, target: number) {
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == target ? { ...player, stamina: player.stamina - 20 } : player
          )
        ]
      })
    },
    randomizeNewPlayer(){
        const newPlayer: Player = {
            name: generateName(),
            stamina: 23,
            hasTurn: false
        }
        this.$patch({
            players: [...this.players, newPlayer]
        })
    }
  },
})
