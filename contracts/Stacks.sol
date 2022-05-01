//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Stacks {
    uint32 private idCounter;
    mapping(address => Stack[]) private stacksByUser;

    struct Stack {
        uint32 id;
        string image;
        address creator_address;
        string comment;
        uint256 created_at;
    }

    event StackAdded(Stack stack);

    function getStacks() public view returns(Stack[] memory) {
        return stacksByUser[msg.sender];
    }

    function addStack(string calldata image, string calldata comment) public {
        Stack memory stack = Stack({
            id: idCounter,
            image: image,
            creator_address: msg.sender,
            comment: comment,
            created_at: block.timestamp
        });
        stacksByUser[msg.sender].push(stack);
        idCounter++;
        emit StackAdded(stack);
    }
}
