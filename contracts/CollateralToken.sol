// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

/// @title An example of an ERC20 token to be used as collateral for the CollateralBackedToken
/// @author Anderson Singh

contract CollateralToken is ERC20 { 

    constructor() ERC20('Collateral Token', 'COL') {
        // mint 100 collateral tokens to the creator. 
        _mint(msg.sender, 100000000000000000000);
    }
}