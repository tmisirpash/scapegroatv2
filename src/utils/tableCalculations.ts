import { BigNumber } from "ethers";

const blockTime = 12;

export function getProbabilityOfWinning(numberOfPlayers: number) : number {
    return Math.round((numberOfPlayers - 1) / numberOfPlayers * 100 * 10000) / 10000;
}

export function getReward(numberOfPlayers: number, stake: BigNumber) : BigNumber {
    return stake.div(BigNumber.from(numberOfPlayers - 1));
}

export function getCooldown(revealBlockNumber: BigNumber, currentBlockNumber: BigNumber) : string {

    if (currentBlockNumber.gte(revealBlockNumber)) return "Open";

    const seconds = revealBlockNumber.sub(currentBlockNumber).toNumber() * blockTime;
    console.log(seconds);

    if (seconds < 60) {
        return `< ${seconds} seconds`;
    } else {
        return `${Math.floor(seconds / 60)} minutes`
    }

}