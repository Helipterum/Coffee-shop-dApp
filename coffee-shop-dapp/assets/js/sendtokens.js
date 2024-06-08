process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Web3 } = require('web3');
const rpcURL = 'https://alfajores-forno.celo-testnet.org';
const web3 = new Web3(rpcURL);
let pvtKey = 'f797d4403674b7ba6525f289c0fc708d2ad5cdea4941b79ce0a99b4b08d869d3';
let accountFrom = '0x0717329C677ab484EAA73F4C8EEd92A2FA948746';
let addressTo = '0x47e74169f174fae15d374684a7e277e2ef3a7acf';

send();
