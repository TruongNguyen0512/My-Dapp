const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const fitnessTokenAddress = "0x6003bbb5258f2fB20B70F741eD94bBFAac2dB432";
  const fitnessAppAddress = "0xFB3fedEc70061CD651eD3fe9f86E35A30fC83950";

  const FitnessToken = await ethers.getContractFactory("FitnessToken");
  const fitnessToken = FitnessToken.attach(fitnessTokenAddress);

  const FitnessApp = await ethers.getContractFactory("FitnessApp");
  const fitnessApp = FitnessApp.attach(fitnessAppAddress);

  // Kiểm tra các chức năng của FitnessToken
  console.log("Minting tokens...");
  const mintTx = await fitnessToken.mint(deployer.address, ethers.parseUnits("100", 18));
  await mintTx.wait();
  console.log("Tokens minted!");

  const balance = await fitnessToken.balanceOf(deployer.address);
  console.log("Balance of deployer:", ethers.formatUnits(balance, 18));

  // Kiểm tra các chức năng của FitnessApp
  // (Bạn cần triển khai các chức năng cụ thể cho FitnessApp trong hợp đồng trước khi thử tương tác)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
