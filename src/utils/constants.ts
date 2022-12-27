export const CHAIN_RPC_URLS = new Map<string, string>([
  ['0x13881', `https://rpc-mumbai.maticvigil.com`], //Mumbai
]);

export const APPROXIMATE_BLOCK_TIMES = new Map<string, number>([
  ['0x13881', 2.25],
]);

export const DEFAULT_CHAIN_ID = '0x13881'; // Mumbai Testnet
export const DEFAULT_CHAIN_NAME = 'Mumbai Testnet';
export const DEFAULT_CHAIN_CURRENCY = 'MATIC'
export const DEFAULT_CHAIN_CURRENCY_DECIMALS = 18;

export const KNOWN_ADDRESSES = new Map<string, string[]>([
  ['0x13881',[
  '0xc9D9cffab4Ce3A95aEd1794a2177c84d38F0Be1c',
  '0x3A4957076e00257d8C7108AFc3E76D1d93b24684',
  '0x03C9Fa3C9c2e42FDff04A3715C0f850509ec6152',
  '0x3E3EF5AE744705B3d3762dE463d0fcE827390263',
  '0xcf85D1A1E92653725CFc702a96bD2eAe93579DD9',
  '0xdEe56AF900089B6569EC28d4eCda024D7cfF372D',
  '0x132173f8FB90f7B581e14E7F2e46Bf6D34690617',
  '0xFd93Ac25E8b398CA72AE20A242d1A60785dd6232',
  '0x6904dEfE074cE99833aa56b28459eBF7E6F42287',
  '0x0B319F6714FFBFf2Eb30aa2B66532630BEDed560',
  '0xDF7db4397ba9B7C1F86bb5C977cF43eB4E2aB256'
  ]],
]);

export const DEAD_ADDRESS = '0xdead000000000000000042069420694206942069';