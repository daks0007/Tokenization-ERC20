"use strict";
var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
var chaiasPromised = require("chai-as-promised");

chai.use(chaiasPromised);
module.exports = chai;
