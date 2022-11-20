//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Groat {
    uint256 public revealBlockNumber = 1;

    uint256 public payout;

    uint128 public stake;
    uint8 public maxPlayers; //A game can have at most 255 players.
    uint8 public queuePtr;
    uint8 public groatIndex = 1;

    mapping(uint8 => address) public queue;

    constructor(uint128 _stake, uint8 _maxPlayers) {
        require(_stake > 0, "Stake must be non-zero.");
        require(_maxPlayers > 1, "Max players must be > 1.");
        require(_stake % (_maxPlayers - 1) == 0, "Stake should be divided evenly.");

        stake = _stake;
        maxPlayers = _maxPlayers;
        payout = _stake + _stake / (_maxPlayers - 1);
    }

    //Append entries in interval [startingId, endingId)
    function appendToQueue(address from, uint8 startingId, uint8 endingId) private {

        while (startingId < endingId) {
            address oldAddress = queue[startingId];
            queue[startingId] = from;
            //Transfer winnings to this person.
            if (oldAddress != address(0) && oldAddress != 0xdEAD000000000000000042069420694206942069 && startingId != groatIndex) {
                (bool success, ) = oldAddress.call{value: payout}("");
                require(success, "Transfer failed.");
            }

            ++startingId;
        }
    }

    function removeEntries(uint8 amount) public returns (uint8) {
        require(amount > 0, "Needs to be non-zero.");
        uint8 localQueuePtr = queuePtr;
        require(localQueuePtr != maxPlayers, "Game in progress.");

        uint8 entriesBeingRemoved = 0;
        uint8 i = 0;
        while (i < localQueuePtr && entriesBeingRemoved < amount) {
            if (queue[i] != msg.sender) {
                ++i;
                continue;
            }

            --localQueuePtr;
            if (i != localQueuePtr) {
                queue[i] = queue[localQueuePtr];
            }
            //Do not zero this storage, otherwise the next entrant will need to allocate it!
            queue[localQueuePtr] = 0xdEAD000000000000000042069420694206942069;
            ++i;
            entriesBeingRemoved++;
        }

        queuePtr = localQueuePtr;
        (bool success, ) = msg.sender.call{value: uint256(stake) * uint256(entriesBeingRemoved)}("");
        require(success, "Withdrawal failed.");
        return entriesBeingRemoved;
    }

    function depositEth(bool partialFulfill) public payable {
        require(block.number >= revealBlockNumber, "Game in progress.");
        uint128 val = uint128(msg.value);
        require(val > 0, "Needs to be non-zero.");
        require(val % stake == 0, "Needs to be multiple of stake.");

        uint8 localQueuePtr = queuePtr;
        uint8 localMaxPlayers = maxPlayers;

        //Wait time is over so a new game can begin.
        if (localQueuePtr == localMaxPlayers) {
            localQueuePtr = 0;
        }

        //User could have submitted more entries than were available.
        uint8 sent = uint8(val / stake);
        uint8 available = localMaxPlayers - localQueuePtr;
        uint8 newEntryCount = sent < available ? sent : available;
        require(partialFulfill || newEntryCount == sent, "Exact order not met.");
        
        //Choose the groat.
        if (localQueuePtr == 0) {
            groatIndex = uint8(uint256(keccak256(abi.encodePacked(block.difficulty))) % localMaxPlayers);
        }

        localQueuePtr += newEntryCount;
        queuePtr = localQueuePtr;

        //User deposited the final entries.
        if (localQueuePtr == localMaxPlayers) {
            revealBlockNumber = block.number + 75;
        }

        //Refund whatever couldn't buy an entry.
        if (newEntryCount < sent) {
            (bool success, ) = msg.sender.call{value: uint256(sent - newEntryCount) * uint256(stake)}("");
            require(success, "Refund failed.");
        }

        appendToQueue(msg.sender, localQueuePtr - newEntryCount, localQueuePtr);
    }
}