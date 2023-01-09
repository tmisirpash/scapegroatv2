import { utils } from 'ethers';

export const CHAIN_RPC_URLS = new Map<string, string>([
  ['0x13881', `https://rpc-mumbai.maticvigil.com`], //Mumbai
  ['80000', '']
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
  '0x7F9eBBefd4799D4a4bB22ee50868666c89797Be8',
  '0x58324ABC50e292ffcFcD67Dd000B624aabC46A16',
  '0x4740C2774CfdbBf30108Cc7Cd8435D0AaE371783',
  '0xeFC54d27405A737e46325C70addd668a82EB13f6',
  '0xEf7783D656c68B92f28f092F717Cf14E6A79c3f1',
  '0xC9cB4A0EE9D9b4Ca9174851AaB9857A835901789',
  '0x4950fEC310258cbCc266fd74181f9d15Ccd8eaF7',
  '0x5eb0CD365B481C43f01D306012A0B9F6D038A96b',
  '0xb192D6C880f82365B29FC3328ea410Fb06E264EF',
  '0xB4C1a24c4348a48964317E411B499E58CdA3a3Bf',
  '0x086f9679FE25E0E237333876d2d36555AE93d2f3'
  ]],
]);

export const DEAD_ADDRESS = '0xdead000000000000000042069420694206942069';

export const EVENT_JOIN: string = "Join(address,uint8)";
export const EVENT_LEAVE: string = "Leave(address,uint8)";
export const EVENT_WINNER: string = "Winner(address)";
export const EVENT_GROATED: string = "Groated(address)";

export const EVENT_JOIN_HASH = utils.id(EVENT_JOIN);
export const EVENT_LEAVE_HASH = utils.id(EVENT_LEAVE);
export const EVENT_WINNER_HASH = utils.id(EVENT_WINNER);
export const EVENT_GROATED_HASH = utils.id(EVENT_GROATED);

export const EVENT_MAP = new Map<string, string>([
  [EVENT_JOIN_HASH, "Added"],
  [EVENT_LEAVE_HASH, "Removed"],
  [EVENT_WINNER_HASH, "Won"],
  [EVENT_GROATED_HASH, "Lost"]
]);

export const EVENT_LIST = [
  EVENT_JOIN_HASH,
  EVENT_LEAVE_HASH,
  EVENT_WINNER_HASH,
  EVENT_GROATED_HASH
];