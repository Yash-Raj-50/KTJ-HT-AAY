require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const loginHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: 'email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: 'Invalid email' });
    //creating refresh token
    const refreshToken = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '15d',
      }
    );

    //add refresh token to db
    user.refreshTokens.push(refreshToken);
    await user.save();

    //refresh token as cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
    });

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = loginHandler;
