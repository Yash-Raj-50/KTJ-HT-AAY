const db = require('../database/db');

const userSchema = new db.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
  createdCompetitions: [
    {
      type: db.Schema.Types.ObjectId,
      ref: 'Competition',
    },
  ],
  appliedCompetitions: [
    {
      competition: {
        type: db.Schema.Types.ObjectId,
        ref: 'Competition',
      },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],
  refreshTokens: [String],
});

const User = db.model('User', userSchema);
module.exports = User;
