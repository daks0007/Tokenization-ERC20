var DaksToken = artifacts.require("./DaksToken.sol");
var myTokenSale = artifacts.require("./myTokenSale.sol");
var KYCtest = artifacts.require("./kycContract.sol");
require("dotenv").config({ path: "../.env" });
module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(DaksToken, process.env.Initial_Tokens);

  await deployer.deploy(KYCtest);
  await deployer.deploy(
    myTokenSale,
    1,
    addr[0],
    DaksToken.address,
    KYCtest.address
  );
  let instance = await DaksToken.deployed();
  await instance.transfer(myTokenSale.address, process.env.Initial_Tokens);
};
