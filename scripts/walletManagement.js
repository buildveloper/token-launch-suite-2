// scripts/createWallets.js
// Junior-friendly Hardhat script: wallet management + supply limits + distribution calculators

const { ethers } = require("hardhat");

// 1️⃣ Create random wallets
async function createWallets(numberOfWallets) {
  const wallets = [];
  for (let i = 0; i < numberOfWallets; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push(wallet);
  }
  return wallets;
}

// 2️⃣ Limit max supply per wallet
function limitMaxSupply(totalSupply, maxPercent) {
  const maxPerWallet = (maxPercent / 100) * totalSupply;
  return maxPerWallet;
}

// 3️⃣ Equal distribution of tokens
function equalDistribution(totalSupply, numberOfWallets) {
  // tokensPerWallet = totalSupply / numberOfWallets
  const tokensPerWallet = totalSupply / numberOfWallets;
  // Create list with same amount for each wallet
  const distribution = Array(numberOfWallets).fill(tokensPerWallet);
  return distribution;
}

// 4️⃣ Random distribution of tokens
function randomDistribution(totalSupply, numberOfWallets) {
  // Generate random weights
  const weights = [];
  for (let i = 0; i < numberOfWallets; i++) {
    weights.push(Math.random());
  }
  // Sum weights
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  // Normalize to percentages and calculate token amounts
  const distribution = weights.map(w => (w / weightSum) * totalSupply);
  return distribution;
}

// 5️⃣ Main function
async function main() {
  console.log("Starting wallet management & distribution tests");

  // --- Wallet creation ---
  const numberOfWallets = 5;
  const wallets = await createWallets(numberOfWallets);
  wallets.forEach((wallet, i) => console.log(`Wallet ${i+1} Address:`, wallet.address));

  // --- Max supply limit ---
  const totalSupply = 1000000;
  const maxPercent = 1.5;
  console.log("Max tokens per wallet:", limitMaxSupply(totalSupply, maxPercent));

  // --- Equal distribution ---
  console.log("\nEqual Distribution:");
  const equalDist = equalDistribution(totalSupply, numberOfWallets);
  equalDist.forEach((amt, i) => console.log(`Wallet ${i+1} tokens:`, amt));

  // --- Random distribution ---
  console.log("\nRandom Distribution:");
  const randomDist = randomDistribution(totalSupply, numberOfWallets);
  randomDist.forEach((amt, i) => console.log(`Wallet ${i+1} tokens:`, amt));
}

// Run main with error handling
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
