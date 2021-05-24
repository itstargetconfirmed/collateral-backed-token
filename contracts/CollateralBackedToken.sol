// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

/// @title An example of a collateral backed token, for example LP token.
/// @author Anderson Singh

contract CollateralBackedToken is ERC20 {

    IERC20 private collateral; 
    uint private multipler; 
    
    constructor (address _collateral) ERC20('Collateral Backed Token', 'CBT') {
        collateral = IERC20(_collateral);
        // for each collateral token, get x2 collateral backed token.
        multipler = 2;
    }

    /// @notice user must first approve collateralAmount.
    function deposit(uint collateralAmount) external {
        collateral.transferFrom(msg.sender, address(this), collateralAmount);
        _mint(msg.sender, collateralAmount * 2);
    }

    /// @notice user must withdraw using the collateral amount, not token amount.
    function withdraw(uint collateralAmount) external {
        require(balanceOf(msg.sender) >= collateralAmount * 2, 'insufficient balance');
        _burn(msg.sender, collateralAmount * 2);
        collateral.transfer(msg.sender, collateralAmount);
    }
}