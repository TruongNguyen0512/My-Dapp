const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4, unique: true }, // Mã định danh người dùng (UUID)
  walletAddress: { type: String, required: true, unique: true }, // Địa chỉ ví MetaMask
  tokens: { type: Number, default: 0 }, // Số lượng token hiện có
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);