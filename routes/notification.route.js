const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');



router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.put('/:id', notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);
router.get('/:id', notificationController.getNotificationById);

module.exports = router
