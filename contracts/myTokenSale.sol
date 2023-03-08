pragma solidity ^0.8.0;
import "./CrowdSale.sol";
import "./kycContract.sol";

contract myTokenSale is Crowdsale{
    kycContract kyc;
constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token,
    kycContract _kyc
)
Crowdsale(rate,wallet,token)
public
{
    kyc = _kyc;


}
 function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
 super._preValidatePurchase(beneficiary,weiAmount);
 require(kyc.kycCompleted(msg.sender),"KYC not completed purchace not allowed");
 }
}