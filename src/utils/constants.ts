import { utils } from 'ethers';

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
  '0x0eB96199e2c9da5A8Dcb109A2E6019A814C521E7',
  '0x60B10Ae099610807Af46D1B8e0f4F4248612802d',
  '0x8af233a4F6b08388a7478a845927B4Db3403a184',
  '0xE906CCe87c4003b130390Cae81349a8d4DedFA48',
  '0x64C6Ce8979170FaD63aB61bCc034d392B2d68315',
  '0x45Feb7A40CA395BE55c5A80Ac9741A5c1588a243',
  '0x98A3f278C37Bc9C8802aF2E7f0B4bE87248ef297',
  '0x846c6C3B6eFCdda1742778a71D6080AC5aBf923f',
  '0x3213Ad37e8e691f66aB5d7Fa86C37d76EdfDbc62',
  '0x4cD4671575d36eDCf6E3eDDD2349E26fCD69a0b0',
  '0xC7Fb57075989C8380d38c95ac4C6b0068Cad3a29'
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