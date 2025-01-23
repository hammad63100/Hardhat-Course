import * as chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

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
        });

        it('Should assign the total supply of tokens to the owner', async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect((await hardhatToken.totalSupply()).eq(ownerBalance)).to.be.true;
        });

        describe("Transactions", function () {
            it('Should transfer token correctly', async function () {
                await hardhatToken.transfer(addr1.address, 5);
                const addr1Balance = await hardhatToken.balanceOf(addr1.address);
                expect(addr1Balance.toNumber()).to.equal(5);

                await hardhatToken.connect(addr1).transfer(addr2.address, 5);
                const addr2Balance = await hardhatToken.balanceOf(addr2.address);
                expect(addr2Balance.toNumber()).to.equal(5);
            });

            it("Should fail if sender doesn't have enough tokens", async function () {
                const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
                await expect(
                    hardhatToken.connect(addr1).transfer(owner.address, 1)
                ).to.be.rejectedWith("Not enough tokens");

                expect((await hardhatToken.balanceOf(owner.address)).eq(initialOwnerBalance)).to.be.true;
            });


            it('Should update balance after transfers', async () => {
                const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
                 await hardhatToken.transfer(addr1.address, 5);
                    await hardhatToken.transfer(addr2.address, 10);

                const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
                expect(finalOwnerBalance.toNumber()).to.equal(initialOwnerBalance.toNumber() - 15);

                const addr1Balance = await hardhatToken.balanceOf(addr1.address);
                expect(addr1Balance.toNumber()).to.equal(5);

                const addr2Balance = await hardhatToken.balanceOf(addr2.address);
                expect(addr2Balance.toNumber()).to.equal(10);
            });
            
        });
    });
});
