import { WarActionType } from "@/core";
import type { Player } from "@/interfaces/player";

export class LogFactory {
    static createLog(logType: WarActionType, player: Player, target?: Player, amount?: number) {
        switch (logType) {
            case WarActionType.ATTACK:
                return `${player.name} attacked ${target?.name} for ${amount} damage`;
            case WarActionType.HEAL:
                return `${player.name} healed himself for ${amount} health`;
            case WarActionType.SWAP:
                return `${player.name} swapped with ${target?.name}`;
        }
    }
}