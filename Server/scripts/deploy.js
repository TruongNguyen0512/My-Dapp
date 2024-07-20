async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const FitnessToken = await ethers.getContractFactory("FitnessToken");
    const token = await FitnessToken.deploy();
    console.log("FitnessToken deployed to:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  