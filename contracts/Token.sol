// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;

import "hardhat/console.sol";


contract Token {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    uint256 public totalSupply = 100000;
    address public owner;


    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to,uint amount) external{
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns(uint256){
        return balances[account];
    }
}