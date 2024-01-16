const Notification = require('../models/notification');


exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(
      {
        success: true,
        data: notification
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('fromUser ToUser');
    res.json({
      success: true,
      data: notifications
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ error: true, message: 'Notification not found' });
    }

    await Notification.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Deleted the notification'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id).populate('fromUser ToUser');
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({
      success: true,
      data: notification
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
