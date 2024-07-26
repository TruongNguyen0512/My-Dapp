const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const FitnessToken = await ethers.getContractFactory("FitnessToken");
  const fitnessToken = await FitnessToken.deploy(deployer.address);
  await fitnessToken.waitForDeployment(); // Chờ giao dịch triển khai hoàn thành

  console.log("FitnessToken deployed to:", await fitnessToken.getAddress());

  const FitnessApp = await ethers.getContractFactory("FitnessApp");
  const fitnessApp = await FitnessApp.deploy(await fitnessToken.getAddress());
  await fitnessApp.waitForDeployment(); // Chờ giao dịch triển khai hoàn thành

  console.log("FitnessApp deployed to:", await fitnessApp.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
