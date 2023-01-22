const bcrypt = require('bcrypt');
const User = require('../models/users');

const registrationHandler = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone)
      return res.status(400).json({ msg: 'details missing' });

    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail)
      return res.status(409).json({ msg: 'Email already exist, please login' });

    const duplicatePhone = await User.findOne({ phone });
    if (duplicatePhone)
      return res.status(409).json({ msg: 'Phone already exist, please login' });

    const user = new User({ name, email, phone });
    await user.save();

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports = registrationHandler;
