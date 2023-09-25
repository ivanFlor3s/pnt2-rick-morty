import type { Player } from '@/interfaces/player'
import { defineStore } from 'pinia'
import { generateName } from '@/utils/names-gen'
import { WarActionType } from './war-actions.enum'
import { LogFactory } from '@/utils/logs-factory'
import { valueBetweenRange } from '@/utils/value-between'
import JSConfetti from 'js-confetti'


const jsConfetti = new JSConfetti()

interface State {
  players: Player[]
  runningGame: boolean
  actionExecuting: WarActionType | null
  logs: string[]
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
        hasSwapped: false,
        force: [20, 30],
        healPower: [30, 40]
      },
      {
        name: 'Pabloide',
        hasTurn: false,
        executingAction: false,
        stamina: 100,
        hasSwapped: false,
        force: [20, 30],
        healPower: [30, 40]
      }
    ],
    actionExecuting: null,
    logs: []
  }),
  getters: {
    isRunning: (state) => state.runningGame,
    oneStriking: (state) => state.players.some((p) => p.executingAction),
    currentPlayer: (state) => state.players.find((p) => p.hasTurn),
    currentStriker: (state) => state.players.find((p) => p.executingAction),
    oneSurvivor: (state) =>
      state.players.filter((p) => p.stamina > 0).length == 1,
    executing: (state) => state.actionExecuting,
    showLogs: (state) => state.logs.length > 0
  },
  actions: {
    heal(index: number) {
      const amount = valueBetweenRange(this.players[index].healPower)
      this.$patch({
        players: [
          ...this.players.map((player, i) =>
            i == index
              ? { ...player, stamina: player.stamina + amount, hasTurn: false }
              : player
          )
        ],
        logs: [
          ...this.logs,
          LogFactory.createLog(
            WarActionType.HEAL,
            this.players[index],
            undefined,
            amount
          )
        ]
      })
      jsConfetti.addConfetti({emojis: ['💖'], confettiNumber: 12})
      this.nextPlayer(index + 1)
    },
    execute(targetName: string) {
      const striker = this.players.find((p) => p.executingAction) as Player
      const victim = this.players.find((p) => p.name == targetName) as Player
      const swapping = this.executing == WarActionType.SWAP

      const amount = valueBetweenRange(striker.force)

      const log = swapping
        ? LogFactory.createLog(WarActionType.SWAP, striker, victim)
        : LogFactory.createLog(WarActionType.ATTACK, striker, victim, amount)

      this.$patch({
        players: [
          ...this.players.map((player) => {
            let result = player
            //Striker
            if (player.name == striker.name) {
              result = {
                ...player,
                executingAction: false,
                hasTurn: false,
                stamina: swapping ? victim.stamina : player.stamina,
                hasSwapped: swapping ? true : player.hasSwapped
              }
            }
            //Victim
            if (player.name == targetName) {
              result = {
                ...player,
                stamina: swapping ? striker.stamina : player.stamina - amount
              }
            }
            return result
          })
        ],
        logs: [...this.logs, log]
      })
      jsConfetti.addConfetti({emojis: swapping ? ['🔄'] : ['🥄','💥'], confettiNumber: 12 })
      this.nextPlayer(
        this.$state.players.findIndex((player) => player.name == striker.name) +
          1
      )
    },
    randomizeNewPlayer() {
      const randomName = generateName()
      const HEALTH_RANGE = [20, 100]
      const FORCE_RANGE = [30, 100]
      const HP_RANGE = [30, 100]
      const newPlayer: Player = {
        name: randomName,
        stamina: randomName.includes('Messi')
          ? 100000
          : valueBetweenRange(HP_RANGE),
        hasTurn: false,
        executingAction: false,
        hasSwapped: false,
        healPower: [HEALTH_RANGE[0], valueBetweenRange(HEALTH_RANGE)],
        force: [FORCE_RANGE[0], valueBetweenRange(FORCE_RANGE)]
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
