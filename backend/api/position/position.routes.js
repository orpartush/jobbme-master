const express = require('express');
const {
  getPositions,
  createNewPosition,
  getPositionById,
  updatePosition,
  removePosition,
} = require('./position.controller');
const router = express.Router();

router.get('/', getPositions);
router.get('/:id', getPositionById);
router.post('/create-position', createNewPosition);
router.post('/remove-position', removePosition);
router.put('/update-position', updatePosition);

module.exports = router;
