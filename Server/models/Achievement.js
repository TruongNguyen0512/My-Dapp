const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // Loại thành tích, ví dụ: "top_stepper", "marathon_runner"
  dateAchieved: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);
