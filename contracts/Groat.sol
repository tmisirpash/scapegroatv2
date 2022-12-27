//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Groat {
    uint256 public revealBlockNumber = 1;

    uint256 public payout;

    uint128 public stake;
    uint8 public maxPlayers; //A game can have at most 255 players.
    uint8 public queuePtr;
    uint8 public groatIndex = 255;
    bool public gameStart;

    mapping(uint8 => address) public queue;

    event Join(address indexed joiner, uint8);
    event Leave(address indexed leaver, uint8);
    event Groated(address indexed groater, uint8);
    event Winner(address indexed winner, uint8);

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

        address[] memory playersToPay = new address[](endingId - startingId);
        uint8 i = startingId;
        uint8 j = 0;
        while (i < endingId) {
            playersToPay[j] = queue[i];
            queue[i] = from;
            emit Join(msg.sender, i);
            ++i;
            ++j;
        }
        i = startingId;
        j = 0;
        while (j < playersToPay.length) {
            address oldAddress = playersToPay[j];
            //Transfer winnings only after contract state was updated.
            if (oldAddress != address(0) && oldAddress != 0xdEAD000000000000000042069420694206942069) {

                if (i == groatIndex) {
                    //This player doesn't have to transfer anything,
                    //so we might as well make them do something useful.
                    emit Groated(oldAddress, i);
                } else {
                    (bool success, ) = oldAddress.call{value: payout}("");
                    require(success, "Transfer failed.");
                    emit Winner(oldAddress, i);
                }
            }
            ++i;
            ++j;
        }
    }

    function removeEntries(uint8 amount) public returns (uint8) {
        require(amount > 0, "Needs to be non-zero.");
        uint8 localQueuePtr = queuePtr;
        require(localQueuePtr != maxPlayers, "Game in progress.");
        require(msg.sender != 0xdEAD000000000000000042069420694206942069);

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
            emit Leave(msg.sender, i);
            //Do not zero this storage, otherwise the next entrant will need to allocate it!
            queue[localQueuePtr] = 0xdEAD000000000000000042069420694206942069;
            ++entriesBeingRemoved;
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
        require(msg.sender != 0xdEAD000000000000000042069420694206942069);

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
        
        //Choose the groat, and make sure the value can't be reset.
        if (!gameStart) {
            groatIndex = uint8(uint256(keccak256(abi.encodePacked(block.difficulty))) % localMaxPlayers);
            gameStart = true;
        }

        localQueuePtr += newEntryCount;
        queuePtr = localQueuePtr;

        //User deposited the final entries.
        if (localQueuePtr == localMaxPlayers) {
            revealBlockNumber = block.number + 75;
            gameStart = false;
        }

        appendToQueue(msg.sender, localQueuePtr - newEntryCount, localQueuePtr);

        //Refund whatever couldn't buy an entry.
        if (newEntryCount < sent) {
            (bool success, ) = msg.sender.call{value: uint256(sent - newEntryCount) * uint256(stake)}("");
            require(success, "Refund failed.");
        }
    }
}