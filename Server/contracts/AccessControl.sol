// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract FitnessAccessControl is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(ADMIN_ROLE, msg.sender);
}
  

    function addAdmin(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, account);
    }

    function addUser(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(USER_ROLE, account);
    }

    function removeAdmin(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(ADMIN_ROLE, account);
    }

    function removeUser(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(USER_ROLE, account);
    }
}
