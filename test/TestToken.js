const CollateralToken = artifacts.require('CollateralToken');
const CollateralBackedToken = artifacts.require('CollateralBackedToken');

contract('Test Collateral Backed Token', async accounts => {
    
    // 2 to 1 ratio of tokens. 
    it('first account balance should be 10 tokens after depositing 5 collateral tokens.', async () => {
        
        // get collateral token. 
        const collateralToken = await CollateralToken.deployed(); 

        // get collateral backed token.
        const collateralBackedToken = await CollateralBackedToken.deployed(); 

        // get accounts 
        const addresses = await web3.eth.getAccounts(); 
        const first_address = addresses[0];

        // approve transfer of 5 collateral tokens (^18)
        await collateralToken.approve(collateralBackedToken.address, '5000000000000000000', {
            from: first_address
        });

        // deposit 5 collateral tokens. 
        await collateralBackedToken.deposit('5000000000000000000', {
            from: first_address
        });

        // get balance of collateral backed token. 
        const balance = await collateralBackedToken.balanceOf.call(first_address);

    
        assert.equal(balance, '10000000000000000000');
    });

    it('first account balance should be 5 tokens after withdrawing 2.5 collateral tokens.', async () => {
        // get collateral token. 
        const collateralToken = await CollateralToken.deployed(); 

        // get collateral backed token.
        const collateralBackedToken = await CollateralBackedToken.deployed(); 

        // get accounts 
        const addresses = await web3.eth.getAccounts(); 
        const first_address = addresses[0];
        
        // withdraw 2.5 collateral tokens from collateral backed tokens.
        await collateralBackedToken.withdraw('2500000000000000000', {
            from: first_address
        });

        // get balance of collateral backed token. 
        const balance = await collateralBackedToken.balanceOf.call(first_address);


        assert.equal(balance, '5000000000000000000');

    });
});