const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FitnessToken contract", function () {
  let FitnessToken;
  let fitnessToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    FitnessToken = await ethers.getContractFactory("FitnessToken");
    fitnessToken = await FitnessToken.deploy(owner.address);
    await fitnessToken.deployed();
  });

  it("Should mint tokens correctly", async function () {
    await fitnessToken.mint(owner.address, ethers.utils.parseUnits("100", 18));
    const balance = await fitnessToken.balanceOf(owner.address);
    expect(ethers.utils.formatUnits(balance, 18)).to.equal("100");
  });

  it("Should allow owner to mint tokens", async function () {
    await fitnessToken.mint(addr1.address, ethers.utils.parseUnits("50", 18));
    const balance = await fitnessToken.balanceOf(addr1.address);
    expect(ethers.utils.formatUnits(balance, 18)).to.equal("50");
  });

  it("Should not allow non-owner to mint tokens", async function () {
    await expect(
      fitnessToken.connect(addr1).mint(addr2.address, ethers.utils.parseUnits("50", 18))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
