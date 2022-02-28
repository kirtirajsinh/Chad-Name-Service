const main = async () =>{
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy("chad");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("doom", {value: hre.ethers.utils.parseEther('0.5')})
    await txn.wait();
    console.log("Minted Domain doom.chad")

    txn = await domainContract.setRecord("doom", "I'm the Chad")
    await txn.wait();
    console.log("Set record for doom.chad");


    const address = await domainContract.getAddress("doom");
    console.log("owner of doom:", address);

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