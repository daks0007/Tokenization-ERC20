const TokenSale = artifacts.require("myTokenSale");
const Token = artifacts.require("DaksToken");

const chai = require("./SetUpChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({ path: "../.env" });
contract("TokenSale Test", async (accounts) => {
  const [deployerAccount, recipientAccount, anotherAccount] = accounts;
  it("should not have any tokens in my deployerAccount", async () => {
    let instance = await Token.deployed();
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });
});
