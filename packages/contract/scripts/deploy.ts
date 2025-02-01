import { ethers } from "hardhat";

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract with account: ${deployer.address}`);

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    console.log("Deploying NFTMarketplace...");
    await nftMarketplace.waitForDeployment();

    console.log(
      `NFTMarketplace deployed to: ${await nftMarketplace.getAddress()}`
    );
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main().then(() => process.exit(0));
