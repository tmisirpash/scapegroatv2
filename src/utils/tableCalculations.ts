import { BigNumber } from "ethers";
import { BLOCK_TIME } from "./constants";

export function getProbabilityOfWinning(numberOfPlayers: number) : number {
    return Math.round((numberOfPlayers - 1) / numberOfPlayers * 100 * 10000) / 10000;
}

export function getReward(numberOfPlayers: number, stake: BigNumber) : BigNumber {
    return stake.div(BigNumber.from(numberOfPlayers - 1));
}

export function getCooldown(revealBlockNumber: BigNumber, currentBlockNumber: BigNumber) : [string, string] {

    if (currentBlockNumber.gte(revealBlockNumber)) return ["Open", ""];

    const blocks = revealBlockNumber.sub(currentBlockNumber).toNumber();
    const seconds = blocks * BLOCK_TIME;

    let tooltip;
    if (seconds < 60) tooltip = "Under a minute remaining.";
    else tooltip = `~${Math.floor(seconds / 60)} minutes remaining.`;

    return [`${blocks} blocks`, tooltip];
}