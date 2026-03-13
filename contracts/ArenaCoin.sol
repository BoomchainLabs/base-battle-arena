// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ArenaCoin is ERC20 {
    constructor() ERC20("ArenaCoin", "ARENA") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
