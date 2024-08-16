// services/activityService.js

const Activity = require('../models/Activity');

async function logActivity(userId, action, details) {
  try {
    // Input validation
    if (!userId || !action) {
      throw new Error('UserId and action are required to log activity.');
    }

    const activity = new Activity({
      userId,
      action,
      details: details || '', // Optional details
      timestamp: new Date(), // Automatically set timestamp to current date
    });

    await activity.save();
    return activity;
  } catch (error) {
    throw new Error('Logging activity failed: ' + error.message);
  }
}

async function getActivities(userId) {
  try {
    if (!userId) {
      throw new Error('UserId is required to retrieve activities.');
    }

    const activities = await Activity.find({ userId }).sort({ timestamp: -1 });
    return activities;
  } catch (error) {
    throw new Error('Retrieving activities failed: ' + error.message);
  }
}

module.exports = {
  logActivity,
  getActivities,
};
