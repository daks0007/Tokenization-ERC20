const Token = artifacts.require("./DaksToken.sol");
const chai = require("./SetUpChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({ path: "../.env" });
contract("Token Test", async (accounts) => {
  const [deployerAccount, recipientAccount, anotherAccount] = accounts;

  beforeEach(async () => {
    this.DaksToken = await Token.new(process.env.Initial_Tokens);
  });
  it("all the tokens should be in my account", async () => {
    let instance = this.DaksToken;
    let totalSupply = await instance.totalSupply();
    return expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });
  it("is possible to send tokens between accounts", async () => {
    const sendTokens = 1;
    let instance = this.DaksToken;
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipientAccount, sendTokens)).to.eventually.be
      .fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(
      instance.balanceOf(recipientAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });
  // it("is not possible to send more tokens than available", async () => {
  //   const sendTokens = 1;
  //   let instance = this.DaksToken;
  //   let balanceOfDeployer = await instance.balanceOf(deployerAccount);
  //   expect(
  //     instance.transfer(
  //       recipientAccount,
  //       new BN(balanceOfDeployer + sendTokens)
  //     )
  //   ).to.eventually.be.rejected;
  //   return expect(
  //     instance.balanceOf(deployerAccount)
  //   ).to.eventually.be.a.bignumber.equal(new BN(balanceOfDeployer));
  // });
});
