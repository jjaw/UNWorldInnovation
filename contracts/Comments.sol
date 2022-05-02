//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Comments {
    uint32 private idCounter;
    mapping(string => Comment[]) private commentsByTopic;

    struct Comment {
        string topic;
        string message;
        address creator_address;
        uint32 id;
        uint256 created_at;
    }

    event CommentAdded(Comment comment);

    function getComments(string calldata topic) public view returns(Comment[] memory) {
        return commentsByTopic[topic];
    }

    function addComment(string calldata topic, string calldata message) public {
        Comment memory comment = Comment({
            id: idCounter,
            topic: topic,
            creator_address: msg.sender,
            message: message,
            created_at: block.timestamp
        });
        commentsByTopic[topic].push(comment);
        idCounter++;
        emit CommentAdded(comment);

    }
}
