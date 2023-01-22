const Competition = require('../models/competition');
const User = require('../models/users');

const getAllCompetitions = async (req, res) => {
  try {
    //find all competitions
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
    // return all created competitions of the user
    const createdCompetitions = await Promise.all(
      user.createdCompetitions.map(async (comp_id) => {
        const competition = await Competition.findById(comp_id).lean();
        return competition;
      })
    );
    const competitions = [...createdCompetitions];

    if (competitions.length === 0)
      return res.status(200).json({ competitions });

    const newComps = await Promise.all(
      competitions.map(async (comps) => {
        if (comps.applications.length === 0) return comps;
        const newAppl = await Promise.all(
          comps.applications.map(async (appl) => {
            const reqstr = await User.findById(appl.requester).lean();
            const newAppl = { ...appl, requester: reqstr };
            return newAppl;
          })
        );
        return { ...comps, applications: newAppl };
      })
    );

    return res.status(200).json({ competitions: newComps });
  } catch (error) {
    return res.json({ msg: `${error.message}` });
    // res.sendStatus(500);
  }
};

const getUserAppliedCompetitions = async (req, res) => {
  const user = req.user;
  try {
    //get all applied competitions
    const competitions = await Promise.all(
      user.appliedCompetitions.map(async (comp) => {
        const competition = await Competition.findById(comp.competition);
        const status = comp.status;

        //return that competiton and status
        return { competition, status };
      })
    );

    return res.status(200).json({ competitions });
  } catch (error) {
    // return res.json({ msg: `${error.message}` });
    res.sendStatus(500);
  }
};

const createCompetition = async (req, res) => {
  //get the user details from the auth middleware
  const user = req.user;
  try {
    //below four are required for to create competition
    const { name, description, totalSeats, availableSeats } = req.body;
    if (!name || !description || !totalSeats || !availableSeats) {
      res.send(400).json({ msg: 'incomplete details provided' });
    }

    //create the competition
    const newCompetition = new Competition({
      name,
      description,
      totalSeats,
      availableSeats,
      creater: user,
    });

    await newCompetition.save();
    user.createdCompetitions.push(newCompetition._id);
    user.save();

    res.sendStatus(201);
  } catch (error) {
    return res.json({ msg: `${error.message}` });
    // res.sendStatus(500);
  }
};

const updateCompetition = async (req, res) => {
  const compId = req.query.id;
  if (!compId) return res.status(400).json({ msg: 'provide id to be updated' });

  //get all the fields to be updated from the update competition
  const updatedInfo = req.body;
  if (!updatedInfo) return res.status(400).json({ msg: 'nothing to update' });

  try {
    //find that competition
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    //update the required one
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

const responseRequest = async (req, res) => {
  const resType = req.query.res;
  const compId = req.query.id;
  const reqId = req.query.requester;

  if (!compId) return res.status(400).json({ msg: 'provide id to be applied' });
  if (!reqId) return res.status(400).json({ msg: 'provide requester id' });
  if (!resType) return res.status(400).json({ msg: 'provide response type' });
  if (resType !== 'accept' && resType !== 'decline')
    return res.status(400).json({ msg: 'invalid resType' });

  try {
    const competition = await Competition.findById(compId);
    if (!competition)
      return res.status(404).json({ msg: "can't find competition" });

    const application = competition.applications.find(
      (application) => application.requester.toString() === reqId.toString()
    );

    application.status = `${resType}`;
    if (resType === 'accept')
      competition.availableSeats = competition.availableSeats - 1;

    await competition.save();

    const requester = await User.findById(reqId);
    const appliedComp = requester.appliedCompetitions.find(
      (comp) => comp.competition.toString() === compId.toString()
    );
    appliedComp.status = `${resType}`;
    await requester.save();

    // if no seats are available set the status to be full
    if (competition.availableSeats === 0) {
      //set the status to all seats full to the pending users

      await Promise.all(
        competition.applications.map(async (appl) => {
          if (appl.status === 'pending') {
            appl.status = 'seats full';
            const reqstr = await User.findById(appl.requester);
            const comp = reqstr.appliedCompetitions.find(
              (compet) => compet.competition.toString() === compId.toString()
            );
            comp.status = `seats full`;
            await reqstr.save();
          }
          return appl;
        })
      );

      await competition.save();
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.json({ msg: `${error.stack}` });
    // res.sendStatus(500);
  }
};

module.exports = {
  getAllCompetitions,
  getUserCreatedCompetitions,
  getUserAppliedCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  createRequest,
  responseRequest,
};
