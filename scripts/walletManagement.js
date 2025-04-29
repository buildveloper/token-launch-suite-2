const { ethers } = require("hardhat");

async function createWallets(numberOfWallets) {
  const wallets = [];
  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push(wallet);
  }
  return wallets;
}

function limitMaxSupply(totalSupply, maxPercent) {
  const maxPerWallet = (maxPercent / 100) * totalSupply;
  return maxPerWallet;
}

function equalDistribution(totalSupply, numberOfWallets) {

  const tokensPerWallet = totalSupply / numberOfWallets;

  const distribution = Array(numberOfWallets).fill(tokensPerWallet);
  return distribution;
}

function randomDistribution(totalSupply, numberOfWallets) {

  const weights = [];
  for (let i = 0; i < numberOfWallets; i++) {
    weights.push(Math.random());
  }
  
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
 
  const distribution = weights.map(w => (w / weightSum) * totalSupply);
  return distribution;
}

async function main() {
  console.log("Starting wallet management & distribution tests");

  const numberOfWallets = 5;
  const wallets = await createWallets(numberOfWallets);
  wallets.forEach((wallet, i) => console.log(`Wallet ${i+1} Address:`, wallet.address));

  const totalSupply = 1000000;
  const maxPercent = 1.5;
  console.log("Max tokens per wallet:", limitMaxSupply(totalSupply, maxPercent));

  console.log("\nEqual Distribution:");
  const equalDist = equalDistribution(totalSupply, numberOfWallets);
  equalDist.forEach((amt, i) => console.log(`Wallet ${i+1} tokens:`, amt));

  console.log("\nRandom Distribution:");
  const randomDist = randomDistribution(totalSupply, numberOfWallets);
  randomDist.forEach((amt, i) => console.log(`Wallet ${i+1} tokens:`, amt));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
