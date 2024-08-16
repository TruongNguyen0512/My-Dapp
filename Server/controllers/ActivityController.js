// controllers/ActivityController.js

const { logActivity, getActivities } = require('../services/activityService');

const ActivityController = {
  async logActivity(req, res) {
    try {
      const { userId, action, details } = req.body;
      const activity = await logActivity(userId, action, details);
      res.status(200).json({ message: 'Activity logged successfully', data: activity });
    } catch (error) {
      res.status(500).json({ message: 'Error logging activity', error: error.message });
    }
  },

  async getActivities(req, res) {
    try {
      const { userId } = req.params;
      const activities = await getActivities(userId);
      res.status(200).json({ message: 'Activities retrieved successfully', data: activities });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving activities', error: error.message });
    }
  }
};

module.exports = ActivityController;
