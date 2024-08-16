// services/smartContractService.js

const { ethers } = require('ethers');
const { abi, bytecode } = require('../contracts/TokenContract');

async function deployContract(contractData) {
  try {
    const factory = new ethers.ContractFactory(abi, bytecode, contractData.signer);
    const contract = await factory.deploy();
    await contract.deployed();
    return contract.address;
  } catch (error) {
    throw new Error('Deploying contract failed: ' + error.message);
  }
}

async function interactWithContract(method, params) {
  try {
    const result = await method(...params);
    await result.wait();
    return result.hash;
  } catch (error) {
    throw new Error('Interacting with contract failed: ' + error.message);
  }
}

module.exports = {
  deployContract,
  interactWithContract
};
