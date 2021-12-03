const { query, createPosition, getPosition, editPosition, deletePosition } = require('./position.service');

module.exports = {
  getPositions,
  createNewPosition,
  getPositionById,
  updatePosition,
  removePosition,
};

async function getPositions(req, res) {
  try {
    const positions = await query();
    res.json(positions);
  } catch (err) {
    console.trace('Error at controller while getting positions:', err);
  }
}

async function createNewPosition(req, res) {
  try {
    const positionData = req.body;
    const user = await createPosition(positionData);
    res.status(200).json(user);
  } catch (err) {
    console.trace('Error at controller while creating position:', err);
  }
}

async function getPositionById(req, res) {
  try {
    const positionId = req.params.id;
    const position = await getPosition(positionId);
    res.json(position);
  } catch (err) {
    console.trace(`Error while getting position by id`, err);
  }
}

async function updatePosition(req, res) {
  try {
    const updatedUser = await editPosition(req.body);
    res.json(updatedUser);
  } catch (err) {
    console.trace(`Error while updating position`, err);
    res.json({ message: `An error occured while updating position` });
  }
}

async function removePosition(req, res) {
  try {
    const { positionId, userId } = req.body;
    await deletePosition(positionId, userId);
    res.json({ message: 'Removed position successfully' });
  } catch (err) {
    console.trace(`Error while removing position`, err);
  }
}
