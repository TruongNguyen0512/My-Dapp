const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const FitnessTokenABI = require('../contracts/abis/FitnessToken.json');
const FitnessAppABI = require('../contracts/abis/FitnessApp.json');

// Load contract addresses from config file
const configFilePath = path.join(__dirname, '..', 'config', 'contracts-config.json');
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

const provider = new ethers.providers.JsonRpcProvider('YOUR_PROVIDER_URL');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const tokenContract = new ethers.Contract(config.FitnessToken, FitnessTokenABI, wallet);
const fitnessAppContract = new ethers.Contract(config.FitnessApp, FitnessAppABI, wallet);

async function mintToken(amount, recipient) {
  try {
    const tx = await fitnessAppContract.mintToken(recipient);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw new Error('Minting token failed: ' + error.message);
  }
}

async function transferToken(amount, sender, recipient) {
  try {
    const tx = await tokenContract.transferFrom(sender, recipient, ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait();
    return tx.hash;
  } catch (error) {
    throw new Error('Transferring token failed: ' + error.message);
  }
}

module.exports = {
  mintToken,
  transferToken
};
