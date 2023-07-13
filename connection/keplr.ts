// import { LOCAL_STORAGE_KEYS } from '@/constants/app';
// import type { Wallet } from '@/types/account';

// /** @see https://docs.keplr.app/api/ */
// export const connectKeplrThen = async (onConnected: (wallet: Wallet) => void) => {
//   if (!window.keplr) {
//     console.log('Please install keplr extension');
//     return;
//   }

//   try {
//     const cosmosChainIds = Object.values(Chain).filter((chainId) => chainId !== Chain.ETHEREUM);

//     await window.keplr.enable(cosmosChainIds);

//     const key = await window.keplr.getKey(Chain.COSMOS);
//     const repAccount = {
//       chainId: Chain.COSMOS,
//       isKeystone: key.isKeystone,
//       isNanoLedger: key.isNanoLedger,
//       name: key.name,
//       bech32Address: key.bech32Address,
//     };

//     const accounts = await Promise.all(
//       cosmosChainIds.map(async (chainId) => {
//         //@ts-ignore
//         const key = await window.keplr.getKey(chainId);
//         return {
//           chainId,
//           isKeystone: key.isKeystone,
//           isNanoLedger: key.isNanoLedger,
//           name: key.name,
//           bech32Address: key.bech32Address,
//         };
//       })
//     );

//     onConnected({
//       type: WalletType.KEPLR,
//       repAccount,
//       accounts,
//     });

//     const { PREFERRED_WALLET } = LOCAL_STORAGE_KEYS;
//     localStorage.setItem(PREFERRED_WALLET, WalletType.KEPLR);
//   } catch (e) {
//     console.log('Wallet connection error', e);
//   }
// };

export const DUMMY = '';
