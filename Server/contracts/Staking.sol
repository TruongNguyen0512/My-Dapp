// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Staking is ReentrancyGuard {
    IERC20 public stakingToken;
    mapping(address => uint256) public stakedAmounts;
    mapping(address => uint256) public rewardAmounts;

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0 tokens");
        stakedAmounts[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(stakedAmounts[msg.sender] >= amount, "Insufficient staked amount");
        stakedAmounts[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function calculateRewards(address user) public view returns (uint256) {
        // Logic để tính toán phần thưởng dựa trên số lượng và thời gian staking
        return rewardAmounts[user];
    }

    function claimRewards() external nonReentrant {
        uint256 reward = calculateRewards(msg.sender);
        require(reward > 0, "No rewards available");
        rewardAmounts[msg.sender] = 0;
        stakingToken.transfer(msg.sender, reward);
    }
}
