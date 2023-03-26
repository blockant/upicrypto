/**
 *Submitted for verification at polygonscan.com on 2023-03-26
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAccountAbstraction {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
}

contract DelegatePayment {
    address public owner;
    address public delegate;
    uint256 public amount;
    address public paymentAddress;
    IAccountAbstraction public accountAbstraction;

    constructor(address _delegate, uint256 _amount, address _paymentAddress, address _accountAbstractionAddress) {
        owner = msg.sender;
        delegate = _delegate;
        amount = _amount;
        paymentAddress = _paymentAddress;
        accountAbstraction = IAccountAbstraction(_accountAbstractionAddress);
    }

    function delegatePayment() public {
        // Approve the delegate to spend the required amount from the paymentAddress
        require(accountAbstraction.approve(delegate, amount), "Failed to approve delegate to spend tokens");
        
        // Execute the payment using the delegate
        require(accountAbstraction.transferFrom(paymentAddress, owner, amount), "Failed to execute delegate payment");
    }
}