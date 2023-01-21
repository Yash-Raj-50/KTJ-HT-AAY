const db = require('../database/db');

const competitionSchema = new db.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  totalSeats: {
    type: Number,
    require: true,
    unique: true,
  },
  availableSeats: {
    type: Number,
    require: true,
  },
  expiry: {
    type: Date,
  },
  creater: {
    type: db.Schema.Types.ObjectId,
    ref: 'Competition',
  },
  applications: [
    {
      requester: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],
});

const Competition = db.model('Competition', competitionSchema);
module.exports = Competition;
