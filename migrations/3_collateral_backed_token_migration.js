const CollateralToken = artifacts.require('CollateralToken');
const CollateralBackedToken = artifacts.require('CollateralBackedToken');

module.exports = function (deployer) {
  
    deployer.then(async () => {
        const collateralToken = await CollateralToken.deployed();
        await deployer.deploy(CollateralBackedToken, collateralToken.address);
    });
};
