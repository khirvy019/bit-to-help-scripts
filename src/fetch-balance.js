import axios from "axios";
/**
 * Example script for fetching the balance of an addresses from Watchtower API
 * 
 * The address must be subscribed in watchtower to work correctly.
 * 
 * Check watchtower-subscription.js on how to subscribe addresses
 */

// What network is currently used
const network = 'chipnet'; // chipnet | mainnet

// Select project id used for Watchtower's API
let watchtower_project_id;
if (network === 'chipnet') {
  watchtower_project_id = 'ebbd3ed8-09e5-4d7f-ad05-094937cdd18c';
} else if (network === 'mainnet') {
  watchtower_project_id = '5722f346-aaca-4a2a-8144-84ddb0dd88fe';
}

// The address to subscribe, if chipnet should be 'bchtest:....';
// This address can be a wallet's address or a smart contract address
const address = 'bitcoincash:....';

// There are different servers for chipnet and mainnet, select url based on what network
let url;
if (network === 'chipnet') {
  url = 'https://chipnet.watchtower.cash/api/balance/bch/' + address + '/';
} else if (network === 'mainnet') {
  url = 'https://watchtower.cash/api/balance/bch/' + address + '/';
}

// Make an API request to WatchTower
const response = await axios.get(url);
const responseData = response.data;
if (responseData.valid) {
  const balance = responseData.spendable; // Example: 0.25 BCH
  console.log('Balance:', balance, 'BCH');
} else {
  console.log('Address is not valid')
}
