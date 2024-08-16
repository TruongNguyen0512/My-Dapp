// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Governance {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
        mapping(address => bool) voted;
    }

    Proposal[] public proposals;

    function createProposal(string memory description) public {
        proposals.push(Proposal({ description: description, voteCount: 0, executed: false }));
    }

    function vote(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voted[msg.sender], "Already voted");
        proposal.voteCount += 1;
        proposal.voted[msg.sender] = true;
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount > 0, "No votes for proposal");
        proposal.executed = true;

        // Thực hiện hành động dựa trên đề xuất
    }
}
