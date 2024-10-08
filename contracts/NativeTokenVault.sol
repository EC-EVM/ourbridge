// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Helpers} from "./libraries/Helpers.sol";

error NativeTokenVault__TransferFailed();
error NativeTokenVault__ZeroAddress();
error NativeTokenVault__InsufficientFunds();
error NativeTokenVault__InsufficientAmount();
error NativeTokenVault__InsufficientFees();
error NativeTokenVault__AlreadyProcessedNonce();

contract NativeTokenVault is Ownable {
  event Transfer(address to, uint256 amount);
  event Deposit(address depositor, uint256 amount, uint256 nonce);

  constructor() Ownable(msg.sender) {}

  uint256 private s_fees;
  uint256 public nonce;

  mapping(address owner => uint256 amount) public balanceOf;
  mapping(uint256 nonce => bool) public processedNonce;

  function transfer(address to, uint256 amount, uint256 otherChainNonce) public onlyOwner {
    if (to == address(0)) revert NativeTokenVault__ZeroAddress();

    uint256 toBalance = balanceOf[to];

    if (toBalance < amount) revert NativeTokenVault__InsufficientFunds();

    if (processedNonce[otherChainNonce]) revert NativeTokenVault__AlreadyProcessedNonce();

    processedNonce[otherChainNonce] = true;

    unchecked {
      balanceOf[to] = toBalance - amount;
    }

    (bool success, ) = payable(to).call{value: amount}("");
    if (!success) revert NativeTokenVault__TransferFailed();

    emit Transfer(to, amount);
  }

  function withdrawFees() public {
    uint256 fees = s_fees;

    if (fees == 0) revert NativeTokenVault__InsufficientFees();

    s_fees = 0;

    address owner = owner();

    (bool success, ) = owner.call{value: fees}("");
    if (!success) revert NativeTokenVault__TransferFailed();

    emit Transfer(owner, fees);
  }

  function getFees() public view returns (uint256) {
    return s_fees;
  }

  receive() external payable {
    if (msg.value <= 0) revert NativeTokenVault__InsufficientAmount();

    (uint256 amount, uint256 fee) = Helpers.extractFee(msg.value);

    s_fees += fee;
    balanceOf[msg.sender] += amount;

    nonce++;

    emit Deposit(msg.sender, amount, nonce);
  }
}