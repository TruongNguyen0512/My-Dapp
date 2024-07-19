// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FitnessToken is ERC20 {

    address public owner;

    mapping(address => uint256) public userActivity; // Ghi nhận hoạt động của người dùng

    event TokensMinted(address indexed user, uint256 amount);
    event TokensTransferred(address indexed to, uint256 amount);

    constructor() ERC20("FitnessToken", "FTK") {
        owner = msg.sender;
    }

    // Mint token khi người dùng hoàn thành hoạt động thể dục
    function mintTokens(address _to, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(_to, _amount);
        emit TokensMinted(_to, _amount);
    }

    // Tính toán phần thưởng (giả sử 1 token = 1 hoạt động)
    function calculateReward(address _user) external view returns (uint256) {
        return userActivity[_user];
    }

    // Cập nhật hoạt động của người dùng
    function logActivity(address _user, uint256 _activityAmount) external {
        require(msg.sender == owner, "Only owner can log activities");
        userActivity[_user] = _activityAmount;
    }

    // Chuyển token tới ví người dùng khi yêu cầu
    function transferTokens(address _to, uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        _transfer(msg.sender, _to, _amount);
        emit TokensTransferred(_to, _amount);
    }
}
