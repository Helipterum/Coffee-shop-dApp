const { Web3 } = require('web3');

async function getBalance() {
	let ABI = [
		{
			constant: true,
			inputs: [{ name: '_owner', type: 'address' }],
			name: 'balanceOf',
			outputs: [{ name: 'balance', type: 'uint256' }],
			type: 'function',
		},
	];

	const rpcURL = 'https://alfajores-forno.celo-testnet.org';
	const web3 = new Web3(rpcURL);

	let myWallet = '0x28323adb899EE5ea8E4C3C24DFe3E38E1117C559';
	let fzarAddress = '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9';

	let contract = new web3.eth.Contract(ABI, fzarAddress);

	let myBalance = await contract.methods.balanceOf(myWallet).call();

	let readableBalance = web3.utils.fromWei(myBalance, 'ether');

	return readableBalance;
}

getBalance()
	.then((data) => {
		console.log('Balance fetched successfully', data);
	})
	.catch((error) => {
		console.log('Error fetching balance', error);
	});
