//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./Groat.sol";

contract GroatFactory {

    //Store games with maxPlayers as a key
    mapping(uint8 => address[]) public games;

    event GameCreated(address indexed, uint128, uint8);

    function createGame(uint128 stake, uint8 maxPlayers) public returns (address) {
        address newGame = address(new Groat(stake, maxPlayers));
        games[maxPlayers].push(newGame);
        emit GameCreated(newGame, stake, maxPlayers);
        return newGame;
    }

    function getLength(uint8 maxPlayers) public view returns (uint256) {
        return games[maxPlayers].length;
    }

    function getCardInfo(uint8 maxPlayers, uint256 index) public view returns (address, uint128, uint8, uint256) {
        Groat g = Groat(games[maxPlayers][index]);
        return (address(g), g.stake(), g.queuePtr(), g.revealBlockNumber());
    }
}