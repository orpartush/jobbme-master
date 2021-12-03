const Position = require('../../models/Position');
const User = require('../../models/User');
const ObjectId = require('mongodb').ObjectId;
const { findUserById } = require('../user/user.service');

module.exports = {
  query,
  createPosition,
  getPosition,
  editPosition,
  deletePosition,
};

async function query() {
  try {
    const positions = await Position.find();
    return positions;
  } catch (err) {
    console.trace('Error at service while getting positions:', err);
  }
}

async function createPosition(positionData) {
  try {
    const user = await User.findOne({ _id: ObjectId(positionData.userId) });
    user.positions = [...user.positions, positionData];
    await user.save();
    //return the all of user object to update loggedInPlayer
    return user;
  } catch (err) {
    console.trace('Error while creating position:', err);
  }
}

async function getPosition(positionId) {
  try {
    if (positionId) {
      const position = await Position.findOne({ _id: positionId });
      return position;
    }
  } catch (err) {
    console.trace(`Error while getting position`, err);
  }
}

async function editPosition(position) {
  try {
    const user = await User.findOne({ _id: ObjectId(position.userId) });
    const existPositionIdx = user.positions.findIndex(oldPosition => {
      return oldPosition._id == position._id;
    });
    user.positions.splice(existPositionIdx, 1, position);
    await user.save();
    return user;
  } catch (err) {
    console.trace(`Error while editing position`, err);
  }
}

async function deletePosition(positionId, userId) {
  try {
    let user = await findUserById(userId);
    const filteredPositions = user.positions.filter(position => position._id != positionId);
    user.positions = filteredPositions;
    await user.save();
    return true;
  } catch (err) {
    console.trace(`Error while deleting position`, err);
  }
}
