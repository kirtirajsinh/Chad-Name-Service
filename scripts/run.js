const main = async () =>{
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy("chad");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("a16z", {value: hre.ethers.utils.parseEther('0.00001')})
    await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("balance: ", hre.ethers.utils.formatEther(balance));

    try{
        txn = await domainContract.connect(owner).withdraw();
        await txn.wait();
        console.log("got the G's")
    }catch(error){
        console.log("Could not rob contract");
    }

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before WithDrawal", hre.ethers.utils.formatEther(ownerBalance))

    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();

    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);


  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
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