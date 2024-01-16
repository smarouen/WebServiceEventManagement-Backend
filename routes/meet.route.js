const express = require('express');
const router = express.Router();
const meetController = require('../controllers/meetController');


router.post("/", meetController.createMeet)
router.get('/', meetController.getAllMeets);
router.get('/:meetId', meetController.getMeetById);
router.put('/:meetId', meetController.updateMeetById);
router.delete('/:meetId', meetController.deleteMeetById);
router.get('/find/search/', meetController.searchMeets);

module.exports = router;
