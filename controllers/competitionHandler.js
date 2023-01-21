const Competition = require('../models/competition');
const User = require('../models/users');

const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    return res.status(200).json({ competitions });
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const getUserCreatedCompetitions = async (req, res) => {
  const user = req.user;
  try {
    const competitions = await Promise.all(
      user.createdCompetitions.map(async (comp_id) => {
        const competition = await Competition.findById(comp_id);
        return competition;
      })
    );

    return res.status(200).json({ competitions });
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const getUserAppliedCompetitions = async (req, res) => {
  const user = req.user;
  try {
    const competitions = await Promise.all(
      user.appliedCompetitions.map(async (comp_id) => {
        const competition = await Competition.findById(comp_id);
        return competition;
      })
    );

    return res.status(200).json({ competitions });
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const createCompetition = async (req, res) => {
  const user = req.user;
  try {
    const { name, description, totalSeats, availableSeats } = req.body;
    if (!name || !description || !totalSeats || !availableSeats) {
      res.send(400).json({ msg: 'incomplete details provided' });
    }

    const newCompetition = new Competition({
      name,
      description,
      totalSeats,
      availableSeats,
      creater: user,
    });

    await newCompetition.save();
    user.createdCompetitions.push(newCompetition._id);

    res.sendStatus(201);
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const updateCompetition = async (req, res) => {
  const compId = req.query.id;
  if (!compId) return res.status(400).json({ msg: 'provide id to be updated' });

  const updatedInfo = req.body;
  if (!updatedInfo) return res.status(400).json({ msg: 'nothing to update' });

  try {
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    for (let key in updatedInfo) {
      competition[key] = updatedInfo[key];
    }
    await competition.save();

    return res.status(200).send(competition);
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const deleteCompetition = async (req, res) => {
  const user = req.user;
  const compId = req.query.id;
  if (!compId) return res.status(400).json({ msg: 'provide id to be deleted' });
  try {
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    await competition.delete();

    //fetch all competitions
    const allCreatedCompetitions = user.createdCompetitions;

    //remove the current competition
    const newCreatedCompetitions = allCreatedCompetitions.filter((id) => {
      if (id !== compId) return id;
    });

    user.createdCompetitions = newCreatedCompetitions;
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const createRequest = async (req, res) => {
  const user = req.user;
  const compId = req.query.id;
  if (!compId) return res.status(400).json({ msg: 'provide id to be applied' });

  try {
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    competition.applications.push({ requester: user._id });
    await competition.save();

    user.appliedCompetitions.push({ competition: compId });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

//incomplete
const responseRequest = async (req, res) => {
  const user = req.user;
  const compId = req.query.id;
  const reqId = req.query.requester;
  if (!compId) return res.status(400).json({ msg: 'provide id to be applied' });
  if (!reqId) return res.status(400).json({ msg: 'provide requester id' });

  try {
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    const application = competition.applications.find(
      (application) => application.requester === reqId
    );

    application.status = 'accepted';
    await competition.save();

    const requester = await User.findById(reqId);
    const appliedComp = requester.appliedCompetitions.find(
      (comp) => (comp.competition = compId)
    );
    appliedComp.status = 'accepted';
    await requester.save();

    return res.sendStatus(200);
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

module.exports = {
  getAllCompetitions,
  getUserCreatedCompetitions,
  getUserAppliedCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
};
