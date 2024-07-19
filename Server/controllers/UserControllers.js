// controllers/UserController.js
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    const { walletAddress, name } = req.body;

    // Kiểm tra xem người dùng với địa chỉ ví đã tồn tại chưa
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (user) {
      return res.status(400).send({ error: 'User already exists' });
    }

    // Tạo người dùng mới với các thông tin cần thiết
    user = new User({
      userId: uuidv4(), // Tạo mã định danh người dùng mới
      walletAddress: walletAddress.toLowerCase(),
      name,
      tokens: 0 // Khởi tạo số lượng token là 0
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Cập nhật thông tin người dùng theo ID
const updateUserById = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Xóa người dùng theo ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
