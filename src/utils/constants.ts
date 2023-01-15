import { utils } from 'ethers';

export const CHAIN_RPC_URLS = new Map<string, string>([
  ['0x1', `https://eth-rpc.gateway.pokt.network`], //Mainnet
]);

export const APPROXIMATE_BLOCK_TIMES = new Map<string, number>([
  ['0x1', 12],
]);

export const DEFAULT_CHAIN_ID = '0x1'; // Mainnet

export const KNOWN_ADDRESSES = new Map<string, string[]>([
  ['0x1', [
  '0x8F8092c2549F3BD0C8ed6e17C0c1056dbd3D9101',
  '0x929Aa543bd5161E44fa907D4Af2Bd16F3794Ec9F',
  '0x67d55711f82e250D26360c70D8a3ae46E7C1f8bb',
  '0x5bCB82343b796559B3d0CC599480ccedb49bC5f3',
  '0xfeF81FA619EA538E58cBB3Bfe195da55eBA17469',
  '0x6a8A77E4bF6aEB3322fA77B4a5ad8560d98C64a7',
  '0xFF2bB6804ACeE63b6da6e367E6Ef98911C62C9A1',
  '0xCF103aCeCACCe5e8EC0481A3b84E2D2A7a1B06A7',
  '0xD967Ae1E8658B4286fD9bf285240377505f97E82',
  '0x33F0399F8998F292a30aD0215685dD11D23B1A98'
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