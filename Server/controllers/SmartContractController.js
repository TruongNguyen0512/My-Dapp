// controllers/SmartContractController.js

const { logActivity } = require('../services/activityService');
const { mintToken } = require('../services/tokenService');

const SmartContractController = {
  async logUserActivity(req, res) {
    try {
      const { user, activity } = req.body;

      // Validate input
      if (!user || !activity) {
        return res.status(400).json({ message: 'User and activity are required.' });
      }

      // Call the activity service function to log activity
      const activityLog = await logActivity(user, activity);
      return res.status(200).json({ message: 'Activity logged successfully', data: activityLog });
    } catch (error) {
      console.error('Error logging activity:', error); // Log the error for debugging
      return res.status(500).json({ message: 'Error logging activity', error: error.message });
    }
  },

  async mintUserToken(req, res) {
    try {
      const { user } = req.body;

      // Validate input
      if (!user) {
        return res.status(400).json({ message: 'User is required.' });
      }

      // Call the token service function to mint token
      const txHash = await mintToken(user);
      return res.status(200).json({ message: 'Token minted successfully', txHash });
    } catch (error) {
      console.error('Error minting token:', error); // Log the error for debugging
      return res.status(500).json({ message: 'Error minting token', error: error.message });
    }
  }
};

module.exports = SmartContractController;
