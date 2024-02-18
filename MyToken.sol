// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    uint256 private _blockReward = 1 ether; // default block reward
    uint256 private _cap; // maximum token supply

    constructor(string memory name, string memory symbol, uint256 totalSupply, uint256 cap, address initialOwner) ERC20(name, symbol) Ownable(initialOwner) {
        _mint(msg.sender, totalSupply);
        _cap = cap;
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, _blockReward);
    }

   function _beforeTokenTransfer(address /* from */, address /* to */, uint256 /* amount */) internal view {
    // Implement any logic needed before token transfer
    require(totalSupply() <= _cap, "CustomToken: cap exceeded");
}


    function setBlockReward(uint256 amount) external onlyOwner {
        _blockReward = amount;
    }

    function destroy(address payable recipient) external onlyOwner {
        require(recipient != address(0), "CustomToken: invalid recipient");
        _burn(msg.sender, balanceOf(msg.sender));
        recipient.transfer(address(this).balance);
    }
}
