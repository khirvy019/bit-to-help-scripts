import { Contract, ElectrumNetworkProvider } from 'cashscript';
import { decodeCashAddress } from '@bitauth/libauth';

import MecenasArtifact from './contract/Mecenas.json' assert { type: 'json' };

export function main() {
  const recipientAddress = 'bitcoincash:....';
  const period = 100;
  const amountBch = 0.001;

  const contract = createContract(recipientAddress, period, amountBch);
  console.log("Contract Address:", contract.address);
}


export function createContract(recipientAddress, period, amountBch) {
  const recipient = cashAddressToPkhash(recipientAddress);
  const amount = bchToSatoshis(amountBch);

  const network = 'chipnet'; // chipnet | mainnet
  const electrumNetworkProvider = new ElectrumNetworkProvider(network);
  const addressType = 'p2sh32'; // p2sh32 | p2sh20

  const contractParameters = [recipient, BigInt(period), BigInt(amount)];
  const options = { provider: electrumNetworkProvider, addressType: addressType };
  const contract = new Contract(MecenasArtifact, contractParameters, options);

  return contract;
}

function cashAddressToPkhash(address) {
  const result = decodeCashAddress(address);
  if (typeof result === 'string') throw new Error(result);
  return result.payload;
}

function bchToSatoshis(bchAmount) {
  const rate = 100_000_000;
  return Math.round(bchAmount * rate);
}

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('index') || import.meta.url.includes('index.ts') || import.meta.url.includes('index.js')) {
  main()
}