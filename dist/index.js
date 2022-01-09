"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, data, timestamp) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.isValidStructure = (candidateBlock) => typeof candidateBlock.index === "number" &&
    typeof candidateBlock.hash === "string" &&
    typeof candidateBlock.previousHash === "string" &&
    typeof candidateBlock.data === "string" &&
    typeof candidateBlock.timestamp === "number";
const genesisBlock = new Block(0, "202020202002022", "", "hello", 20220109);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (candidateBlock) => Block.calculateBlockHash(candidateBlock.index, candidateBlock.previousHash, candidateBlock.data, candidateBlock.timestamp);
const isBlockValid = (previousBlock, candidateBlock) => {
    if (!Block.isValidStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
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
//# sourceMappingURL=index.js.map