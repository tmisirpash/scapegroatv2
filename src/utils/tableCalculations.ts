import { BigNumber, utils, constants } from "ethers";
import { BLOCK_TIME } from "./constants";

const MILLION = BigNumber.from("1000000");
// const MILLIONTH = BigNumber.from("0.0000001");

export function getProbabilityOfWinning(numberOfPlayers: number) : number {
    return Math.round((numberOfPlayers - 1) / numberOfPlayers * 100 * 10000) / 10000;
}

export function getReward(numberOfPlayers: number, stake: BigNumber) : BigNumber {
    return stake.div(BigNumber.from(numberOfPlayers - 1));
}

export function getCooldown(revealBlockNumber: BigNumber, currentBlockNumber: BigNumber) : [string, string] {

    //Loading state.
    if (currentBlockNumber.eq(constants.Zero)) return ["", ""];

    if (currentBlockNumber.gte(revealBlockNumber)) return ["Open", ""];

    const blocks = revealBlockNumber.sub(currentBlockNumber).toNumber();
    const seconds = blocks * BLOCK_TIME;

    let tooltip;
    if (seconds < 60) tooltip = "Under a minute remaining.";
    else tooltip = `~${utils.commify(Math.floor(seconds / 60))} minutes remaining.`;

    return [`${blocks} blocks`, tooltip];
}