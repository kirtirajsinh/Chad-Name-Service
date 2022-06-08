const main = async () => {
    const { ethers } = require("hardhat");
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("chad");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
    let txn = await domainContract.register("Kirtiraj",  {value: hre.ethers.utils.parseEther('0.0001')});
    await txn.wait();
    console.log("Minted domain kirtiraj.chad");

    txn = await domainContract.setRecord("Kirtiraj", "Am I a Chad?");
    await txn.wait();
    console.log("Set record for Kirtiraj.chad");

    const address = await domainContract.getAddress("chad");
    console.log("Owner of domain Kirtiraj:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
    }

    const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    };

runMain();