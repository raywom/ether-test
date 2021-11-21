// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract Charity is Ownable {
    address[] private contributors;
    mapping(address => uint256) private _donatedAmount;

    event Received(address, uint256);

    receive() external payable {
        if (_donatedAmount[msg.sender] == 0) {
            contributors.push(msg.sender);
        }
        _donatedAmount[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    function withdraw(address payable _dest) public onlyOwner {
        bool sent = _dest.send(address(this).balance);
        require(sent, "Failed to send Ether");
    }

    function getContributors() public view returns (address[] memory) {
        return contributors;
    }

}