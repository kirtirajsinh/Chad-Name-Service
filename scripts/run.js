const main = async () =>{
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy("chad");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);

    const txn = await domainContract.register("doom", {value: hre.ethers.utils.parseEther('0.5')})
    await txn.wait();

    const address = await domainContract.getAddress("doom");
    console.log("owner of doom:", address);

    const domainOwner = await domainContract.getAddress("doom");
    console.log("owner of domain: ", domainOwner)

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("balance: ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () =>{
    try{
        await main();
        process.exit(0)
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

runMain();