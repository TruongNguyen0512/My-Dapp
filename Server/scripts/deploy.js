const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy FitnessToken contract
  const FitnessToken = await ethers.getContractFactory("FitnessToken");
  const fitnessToken = await FitnessToken.deploy(deployer.address);
  await fitnessToken.deployed();
  console.log("FitnessToken deployed to:", fitnessToken.address);

  // Deploy FitnessApp contract with FitnessToken's address
  const FitnessApp = await ethers.getContractFactory("FitnessApp");
  const fitnessApp = await FitnessApp.deploy(fitnessToken.address);
  await fitnessApp.deployed();
  console.log("FitnessApp deployed to:", fitnessApp.address);

  // Save contract addresses to config file
  const configFilePath = path.join(__dirname, '..', 'config', 'contracts-config.json');
  const config = {
    FitnessToken: fitnessToken.address,
    FitnessApp: fitnessApp.address
  };

  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  console.log("Contract addresses have been saved to config file.");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
