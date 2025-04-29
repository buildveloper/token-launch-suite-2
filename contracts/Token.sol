// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MyToken is ERC20 {
    address public owner;
    address public treasury;
    address public liquidityPool;

    uint256 public transferTax = 2;       
    uint256 public maxWalletPercent = 15; 
    uint256 public maxTxPercent = 10;     
    bool    public tradingEnabled = false;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }


    constructor(address _treasury, address _liquidityPool) ERC20("MyToken", "MTK") {
        owner = msg.sender;
        treasury = _treasury;
        liquidityPool = _liquidityPool;
        _mint(owner, 1_000_000 * 10 ** decimals());
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        
        if (!tradingEnabled) {
            require(msg.sender == owner || to == owner, "Trading not enabled");
        }

        uint256 supply = totalSupply();
        uint256 maxTx    = (maxTxPercent    * supply) / 1000; 
        uint256 maxWallet= (maxWalletPercent* supply) / 1000; 

        require(amount <= maxTx, "Exceeds max transaction amount");
        require(balanceOf(to) + amount <= maxWallet, "Exceeds max wallet size");

        uint256 taxAmount = (amount * transferTax) / 100;
        uint256 netAmount = amount - taxAmount;

        super.transfer(to, netAmount);
        super.transfer(treasury, taxAmount);

        return true;
    }

    function enableTrading() external onlyOwner {
        tradingEnabled = true;
    }

    function addLiquidity(uint256 liquidityAmount) external onlyOwner {
        transfer(liquidityPool, liquidityAmount);
    }
}
