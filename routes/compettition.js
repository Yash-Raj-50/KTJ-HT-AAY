require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth.js');

const {
  getAllCompetitions,
  getUserCreatedCompetitions,
  getUserAppliedCompetitions,
  createCompetition,
  createRequest,
  responseRequest,
} = require('../controllers/competitionHandler.js');

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    `http://localhost:${process.env.FRONT_END_PORT}`
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.use(
  cors({
    origin: `http://localhost:${process.env.FRONT_END_PORT}`,
    credentials: true,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: 'false' }));
router.use(cookieParser());

router.get('/all', getAllCompetitions);
router.get('/created-comp', auth, getUserCreatedCompetitions);
router.get('/applied-comp', auth, getUserAppliedCompetitions);
router.post('/create', auth, createCompetition);
router.post('/create-request', auth, createRequest);
router.post('/response-request', responseRequest);

module.exports = router;
