// controllers/AuthController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');
const sigUtil = require('@metamask/eth-sig-util');

// Xác thực địa chỉ ví
const authenticateWallet = async (req, res) => {
  try {
    const { account, signature } = req.body;
    const message = `Sign this message to authenticate: ${new Date().toISOString()}`;

    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(message, 'utf8'));
    const recoveredAddress = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    if (recoveredAddress.toLowerCase() !== account.toLowerCase()) {
      return res.status(401).send({ error: 'Invalid signature' });
    }

    let user = await User.findOne({ walletAddress: account });
    if (!user) {
      user = new User({ walletAddress: account });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Tạo người dùng mới (đăng ký)
const registerUser = async (req, res) => {
  try {
    const { account, name, email } = req.body;

    let user = await User.findOne({ walletAddress: account });
    if (user) {
      return res.status(400).send({ error: 'User already exists' });
    }

    user = new User({ walletAddress: account, name, email });
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Xác thực người dùng (đăng nhập)
const loginUser = async (req, res) => {
  try {
    const { account, signature } = req.body;
    const message = `Sign this message to login: ${new Date().toISOString()}`;

    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(message, 'utf8'));
    const recoveredAddress = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    if (recoveredAddress.toLowerCase() !== account.toLowerCase()) {
      return res.status(401).send({ error: 'Invalid signature' });
    }

    const user = await User.findOne({ walletAddress: account });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  authenticateWallet,
  registerUser,
  loginUser,
};
