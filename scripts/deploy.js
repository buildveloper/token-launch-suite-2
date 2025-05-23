const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const treasuryAddress = deployer.address; 
  const liquidityPoolAddress = deployer.address; 

  const MyToken = await hre.ethers.getContractFactory("MyToken");

  const myToken = await MyToken.deploy(treasuryAddress, liquidityPoolAddress);

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", myToken.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });