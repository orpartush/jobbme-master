const { findUserById } = require('./user.service');

module.exports = {
  getUserById,
};

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    let user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(`Error while getting user by id(controller)`, err);
  }
}
