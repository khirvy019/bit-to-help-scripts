import { decodeCashAddress } from '@bitauth/libauth'

export function cashAddressToPkhash(address) {
  const result = decodeCashAddress(address);
  if (typeof result === 'string') throw new Error(result);
  return result.payload;
}

