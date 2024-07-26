// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./FitnessToken.sol";

contract FitnessApp {
    FitnessToken public token;
    mapping(address => uint256) public activities;

    event ActivityLogged(address indexed user, uint256 activity, uint256 timestamp);
    event TokenMinted(address indexed user, uint256 amount, uint256 timestamp);

    constructor(FitnessToken _token) {
        token = _token;
    }

    function logActivity(address user, uint256 activity) external {
        activities[user] += activity;
        emit ActivityLogged(user, activity, block.timestamp);
    }

    function calculateReward(address user) public view returns (uint256) {
        // Giả sử mỗi 10 đơn vị hoạt động tương ứng với 1 token
        return activities[user] / 10;
    }

    function mintToken(address user) external {
        uint256 reward = calculateReward(user);
        require(reward > 0, "No reward available");
        
        // Reset user's activity to 0 after minting tokens
        activities[user] = 0;

        token.mint(user, reward);
        emit TokenMinted(user, reward, block.timestamp);
    }
}
