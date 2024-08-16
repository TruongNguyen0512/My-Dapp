// controllers/TokenController.js

const { mintToken, transferToken, calculateReward } = require('../services/tokenService');

const TokenController = {
  async mintToken(req, res) {
    try {
      const { amount, recipient } = req.body;
      const result = await mintToken(amount, recipient);
      res.status(200).json({ message: 'Token minted successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error minting token', error: error.message });
    }
  },

  async transferToken(req, res) {
    try {
      const { amount, sender, recipient } = req.body;
      const result = await transferToken(amount, sender, recipient);
      res.status(200).json({ message: 'Token transferred successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error transferring token', error: error.message });
    }
  },

  async calculateReward(req, res) {
    try {
      const { userId } = req.params;
      const reward = await calculateReward(userId);
      res.status(200).json({ message: 'Reward calculated successfully', data: reward });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating reward', error: error.message });
    }
  }
};

module.exports = TokenController;
