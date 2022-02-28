import './App.css';
import {useEffect , useState} from "react"

function App() {
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}


  const checkIfWalletIsConnected = async () =>{
    const { ethereum } = window;

		if (!ethereum) {
			console.log("Make sure you have MetaMask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

    const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
  }

  const renderNotConnectedContainer = () => (
		<div className="connect-wallet-container">
			<img src="https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif" alt="Ninja gif" />
			<button onClick={connectWallet} className="cta-button connect-wallet-button">
				Connect Wallet
			</button>
		</div>
  	);
    useEffect(() => {
      checkIfWalletIsConnected();
    }, [])
  return (
    <div className="App">
			<div className="container">

				<div className="header-container">
					<header>
            <div className="left">
              <p className="title">Chad Name Service</p>
              <p className="subtitle">Your immortal API on the blockchain!</p>
            </div>
					</header>
				</div>
        {!currentAccount && renderNotConnectedContainer()}
			</div>
		</div>
  );
}

export default App;
