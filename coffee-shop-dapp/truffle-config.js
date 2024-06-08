const HDWalletProvider = require('@truffle/hdwallet-provider');

require('babel-register');
require('babel-polyfill');

const PRIVATE_KEY = '47bca25c5b3295958b43af2cc0d4d3ec0021037bda5a0f23467c7ef8ef29ee2e';

module.exports = {
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*', // Match any network id
		},
		celo: {
			provider: () => new HDWalletProvider(PRIVATE_KEY, 'https://alfajores-forno.celo-testnet.org'),
			network_id: 44787,
			gas: 8000000,
			gasPrice: 30000000000, // Updated gasPrice value to meet the minimum gas price floor requirement
		},
	},
	contracts_directory: './contracts/',
	contracts_build_directory: './abis/',
	compilers: {
		solc: {
			version: '0.8.0',
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
