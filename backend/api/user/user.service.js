const ObjectId = require('mongodb').ObjectId;
const User = require('../../models/User');

module.exports = {
  findUserById,
};

async function findUserById(id) {
  try {
    const user = await User.findOne({ _id: ObjectId(id) });
    return user;
  } catch (err) {
    console.error(`Error while finding user by id(service)`, err);
  }
}
