// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from"@openzeppelin/contracts/token/ERC20/ERC20.sol";

error NativeTokenClone__AlreadyProcessedNonce();

contract NativeTokenClone is ERC20, Ownable {

  event Withdraw(address owner, uint256 amount, uint256 nonce);

  constructor(string memory _name, string memory _symbol) Ownable(msg.sender) ERC20(_name, _symbol) {}

  uint256 public nonce;

  mapping(uint256 nonce => bool) public processedNonce;

  function burn(uint256 amount) public {
    _burn(msg.sender, amount);

    nonce++;

    emit Withdraw(msg.sender, amount, nonce);
  }

  function mint(address to, uint256 amount, uint256 otherChainNonce) public onlyOwner {
    if (processedNonce[otherChainNonce]) revert NativeTokenClone__AlreadyProcessedNonce();

    processedNonce[otherChainNonce] = true;

    _mint(to, amount);
  }
}