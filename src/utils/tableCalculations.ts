import { BigNumber, utils, constants } from "ethers";
import { APPROXIMATE_BLOCK_TIMES } from "./constants";

export function getProbabilityOfWinning(numberOfPlayers: number) : number {
    return Math.round((numberOfPlayers - 1) / numberOfPlayers * 100 * 10000) / 10000;
}

export function getReward(numberOfPlayers: number, stake: BigNumber) : BigNumber {
    return stake.div(BigNumber.from(numberOfPlayers - 1));
}

export function getCooldown(revealBlockNumber: BigNumber, currentBlockNumber: BigNumber, chainId: string) : [string, string] {

    //Loading state.
    if (currentBlockNumber.eq(constants.Zero)) return ["", ""];

    if (currentBlockNumber.gte(revealBlockNumber)) return ["Open", ""];

    const blocks = revealBlockNumber.sub(currentBlockNumber).toNumber();
    const seconds = blocks * (APPROXIMATE_BLOCK_TIMES.get(chainId) || 0);

    let tooltip;
    if (seconds < 60) tooltip = "Under a minute remaining.";
    else tooltip = `~${utils.commify(Math.floor(seconds / 60))} minutes remaining.`;

    return [`${blocks} blocks`, tooltip];
}

export function blockDifferenceToTimeDifference(startBlock: number, stopBlock: number, chainId: string) : string {

    const seconds = (stopBlock - startBlock) * (APPROXIMATE_BLOCK_TIMES.get(chainId) || 0);

    if (seconds <= 60) {
        return `< 60 sec. ago`;
    }

    let res = seconds / 86400;
    let unit = 'd.'
    if (seconds < 3600) {
        res = seconds / 60;
        unit = 'min.';
    }
    else if (seconds < 86400) {
        res = seconds / 3600;
        unit = 'hr.';
    }

    const rounded = Math.floor(res);

    return `${utils.commify(rounded)} ${unit} ago`;
}