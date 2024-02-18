const { ethers } = require("hardhat");

async function main() {
    // Compile the contract and get the contract factory
    const Token = await ethers.getContractFactory("MyToken");

    // Deploy the contract with an initial supply
    const initialSupply = ethers.utils.parseUnits("1000", "ether"); // 1000 tokens
    const token = await Token.deploy(initialSupply);
    await token.deployed();

    console.log(`Token deployed to: ${token.address}`);

    // Interaction example: Transfer tokens
    const [deployer, recipient] = await ethers.getSigners();
    const transferAmount = ethers.utils.parseUnits("100", "ether"); // 100 tokens

    // Display deployer balance before transfer
    let deployerBalance = await token.balanceOf(deployer.address);
    console.log(`Deployer balance before: ${ethers.utils.formatUnits(deployerBalance, "ether")} tokens`);

    // Execute transfer
    await token.transfer(recipient.address, transferAmount);

    // Display balances after transfer
    deployerBalance = await token.balanceOf(deployer.address);
    let recipientBalance = await token.balanceOf(recipient.address);
    console.log(`Deployer balance after: ${ethers.utils.formatUnits(deployerBalance, "ether")} tokens`);
    console.log(`Recipient balance: ${ethers.utils.formatUnits(recipientBalance, "ether")} tokens`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
