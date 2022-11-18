//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Groat {
    uint256 public revealBlockNumber;

    uint256 public payout;

    uint128 public stake;
    uint8 public maxPlayers; //A game can have at most 255 players.
    uint8 public queuePtr;
    uint8 public groatIndex;

    mapping(uint8 => address) public queue;
    mapping(address => uint256) public playerEntries;

    constructor(uint128 _stake, uint8 _maxPlayers) {
        require(_stake > 0, "Stake must be non-zero.");
        require(_maxPlayers > 1, "Max players must be > 1.");
        require(_stake % (_maxPlayers - 1) == 0, "Stake should be divided evenly.");

        stake = _stake;
        maxPlayers = _maxPlayers;
        payout = _stake + _stake / (_maxPlayers - 1);
    }

    function min(uint8 a, uint8 b) private pure returns (uint8) {
        return a <= b ? a : b;
    }

    //Append entries in interval [startingId, endingId]
    function appendToQueue(address from, uint8 startingId, uint8 endingId) private {
        uint256 bitmap = playerEntries[from];

        //Make sure we zero out stale bitmaps from the previous game.
        if (bitmap >= 1 << startingId) bitmap = 0;

        while (startingId <= endingId) {

            address oldAddress = queue[startingId];
            //Transfer winnings to this person.
            if (oldAddress != address(0)) {
                if (startingId != groatIndex) payable(oldAddress).transfer(payout);

                //Clear their bitmap if it is stale. (No need to do this if this entry belonged to from.)
                if (oldAddress != from) {
                    uint256 oldBitmap = playerEntries[oldAddress];
                    if (oldBitmap >= 1 << startingId) delete playerEntries[oldAddress];
                }
            }

            queue[startingId] = from;
            bitmap |= 1 << startingId;
            ++startingId;
        }
        playerEntries[from] = bitmap;
    }

    function removeEntries(uint8 amount) public returns (uint8) {
        require(amount > 0, "Needs to be non-zero.");
        uint8 localQueuePtr = queuePtr;
        require(localQueuePtr != maxPlayers, "Game in progress.");

        uint256 bitmap = playerEntries[msg.sender];
        require(bitmap > 0 && bitmap < 1 << localQueuePtr, "Nothing to remove.");

        uint8 entriesBeingRemoved = 0;
        while (bitmap != 0 && entriesBeingRemoved < amount) {
            
            //Obtain index of leftmost set bit of sender's bitmap.
            //(Equivalent to their last entry.)
            uint256 temp = bitmap;
            uint8 index = 0;
            while (temp != 1) {
                temp >>= 1;
                ++index;
            }

            --localQueuePtr;

            address addressToMove = queue[localQueuePtr];
            if (addressToMove != msg.sender) {
                //Swap the queue[localQueuePtr] with queue[index]
                uint256 lastBitmap = playerEntries[addressToMove];

                //Zero the address's last entry (leftmost bit).
                lastBitmap ^= 1 << localQueuePtr;
                //Set the bit at index.
                lastBitmap ^= 1 << index;
                //Save the new bitmap.
                playerEntries[addressToMove] = lastBitmap;

                queue[index] = addressToMove;
            }

            queue[localQueuePtr] = address(0);
            bitmap ^= 1 << index;
            ++entriesBeingRemoved;
        }
        if (bitmap != 0) {
            playerEntries[msg.sender] = bitmap;
        } else {
            delete playerEntries[msg.sender];
        }
        queuePtr = localQueuePtr;
        return entriesBeingRemoved;
    }

    function depositEth() public payable {
        require(block.number >= revealBlockNumber, "Game in progress.");
        uint128 val = uint128(msg.value);
        require(val > 0, "Needs to be non-zero.");
        require(val % stake == 0, "Needs to be multiple of stake.");

        uint8 localQueuePtr = queuePtr;
        uint8 localMaxPlayers = maxPlayers;

        if (localQueuePtr == localMaxPlayers) {
            localQueuePtr = 0;
            groatIndex = uint8(uint256(keccak256(abi.encodePacked(block.difficulty))) % localMaxPlayers);
        }

        uint8 newEntryCount = min(
            uint8(val / stake),
            localMaxPlayers - localQueuePtr
        );

        appendToQueue(msg.sender, localQueuePtr, localQueuePtr + newEntryCount - 1);

        localQueuePtr += newEntryCount;

        if (localQueuePtr == localMaxPlayers) {
            revealBlockNumber = block.number + 64;
        }

        queuePtr = localQueuePtr;
        maxPlayers = localMaxPlayers;
    }
}