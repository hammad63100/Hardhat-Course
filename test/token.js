const { expect } = require("chai");

describe('Token contract', function() {


    it('Deployment should assign the total supply of tokens to the owner ', async function () {
        
        const [owner] = await ethers.getSigners();
        console.log("Signers Object: ", owner);

        const Token = await ethers.getContractFactory('Token'); // instance contract

        const hardhatToken = await Token.deploy(); // deploy contract

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        console.log("Owner Address: ", owner.address); // ownerBalance = 100000

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);  //totalSupply = 100000
    });
    
    
    
});
