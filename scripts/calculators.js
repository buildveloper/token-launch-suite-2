function marketCapSpend(targetMarketCap, tokenPrice) {
    const tokensNeeded = targetMarketCap / tokenPrice;
    return tokensNeeded;
  }
  
  function liquidityTarget(totalSupply, liquidityPercent) {
    const tokensForLiquidity = (liquidityPercent / 100) * totalSupply;
    return tokensForLiquidity;
  }
  

  function supplyPercentToSpend(totalSupply, percent, tokenPrice) {
    const tokens = (percent / 100) * totalSupply;
    const spend = tokens * tokenPrice;
    return spend;
  }
  
  function spendToSupplyPercent(spend, totalSupply, tokenPrice) {
    const tokens = spend / tokenPrice;
    const percent = (tokens / totalSupply) * 100;
    return percent;
  }
  
  function buyToBond(targetBonded, bondingRate) {
    const tokensToBuy = targetBonded / bondingRate;
    return tokensToBuy;
  }
  
  async function main() {
    console.log("Starting calculator tests");
  
    const testMarketCap = 10000;  
    const testPrice = 0.01;        
    const needed = marketCapSpend(testMarketCap, testPrice);
    console.log("Tokens needed for market cap:", needed);
  

    const testSupply = 1000000;   
    const testPercent = 10;    
    const reserve = liquidityTarget(testSupply, testPercent);
    console.log("Tokens for liquidity:", reserve);
  

    const testSupply2 = 1000000;  
    const testPercent2 = 5;     
    const testPrice2 = 0.01;        
    const spendAmount = supplyPercentToSpend(testSupply2, testPercent2, testPrice2);
    console.log("Spend for supply percentage:", spendAmount);
  
    const testSpend = 500;         
    const testSupply3 = 1000000;    
    const testPrice3 = 0.01;        
    const supplyPercent = spendToSupplyPercent(testSpend, testSupply3, testPrice3);
    console.log("Percentage of supply for spend:", supplyPercent);
  
   
    const testBonded = 5000;       
    const testRate = 0.5;         
    const tokensToBuy = buyToBond(testBonded, testRate);
    console.log("Tokens to buy for bonding:", tokensToBuy);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  