import axios from "axios";
/**
 * Example script for subscribing addresses to Watchtower API
 * 
 * Subscribing the address will allow Watchtower server to track the address'
 * UTXOs and balances.
 * 
 * Check fetch-balance.js for fetching balance
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

const data = {
  project_id: watchtower_project_id,
  address: address,
}


// There are different servers for chipnet and mainnet, select url based on what network
let url;
if (network === 'chipnet') {
  url = 'https://chipnet.watchtower.cash/api/subscription/';
} else if (network === 'mainnet') {
  url = 'https://watchtower.cash/api/subscription/';
}


// Make an API request to WatchTower
const response = await axios.post(url, data);
const responseData = response.data;
if (responseData.success) {
  console.log('Subscribe Successfull!');
} else {
  console.log('Subscribe Failed:', responseData.error);
}
