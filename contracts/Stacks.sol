//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract Stacks is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Stacks", "STK") {}

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


    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
