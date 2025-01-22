import { expect } from "chai";

// describe('Token contract', function() {
//     it('Deployment should assign the total supply of tokens to the owner ', async function () {
//         const [owner] = await ethers.getSigners();
//         console.log("Signers Object: ", owner);

//         const Token = await ethers.getContractFactory('Token'); // instance contract

//         const hardhatToken = await Token.deploy(); // deploy contract

//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         console.log("Owner Address: ", owner.address); // ownerBalance = 100000

//         expect((await hardhatToken.totalSupply()).eq(ownerBalance)).to.be.true;  //totalSupply = 100000
//     });


//     it('should transfer token between accounts ', async function () {
//         const [owner,addr1,addr2] = await ethers.getSigners();


//         const Token = await ethers.getContractFactory('Token'); // instance contract

//         const hardhatToken = await Token.deploy(); // deploy contract

//         // transfer 10 token from owner to addr1
//         await hardhatToken.transfer(addr1.address,10);

//         expect((await hardhatToken.balanceOf(addr1.address)).toNumber()).to.equal(10);

//         // transfer 5 token from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address,5);

//         expect((await hardhatToken.balanceOf(addr2.address)).toNumber()).to.equal(5);


//     });
// });



describe('Token contract', function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory('Token'); // instance contract 

        [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); // get signers

        hardhatToken = await Token.deploy(); // deploy contract 
    })


    describe("Deployment", function () {
        it('Should  set the right owner', async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        }
        );

        it('Should assign the total supply of tokens to the owner', async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });

        describe("Transactions", function () {
            it('Should transfer token correctly', async function () {
                
                await hardhatToken.transfer(addr1.address, 5);
                const addr1Balance = await hardhatToken.balanceOf(addr1.address);






            });
        });
    });
});
