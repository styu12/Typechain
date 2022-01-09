import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static isValidStructure = (candidateBlock: Block): boolean =>
    typeof candidateBlock.index === "number" &&
    typeof candidateBlock.hash === "string" &&
    typeof candidateBlock.previousHash === "string" &&
    typeof candidateBlock.data === "string" &&
    typeof candidateBlock.timestamp === "number";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(
  0,
  "202020202002022",
  "",
  "hello",
  20220109
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);

  return newBlock;
};

const getHashForBlock = (candidateBlock: Block): string =>
  Block.calculateBlockHash(
    candidateBlock.index,
    candidateBlock.previousHash,
    candidateBlock.data,
    candidateBlock.timestamp
  );

const isBlockValid = (previousBlock: Block, candidateBlock: Block): boolean => {
  if (!Block.isValidStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(getLatestBlock(), candidateBlock)) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second Block");
setTimeout(() => {
  createNewBlock("third Block");
}, 1000);
setTimeout(() => {
  createNewBlock("fourth Block");
}, 2000);

setTimeout(() => {
  console.log(getBlockchain());
}, 3000);

export {};
