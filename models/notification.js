const mongoose = require('mongoose');
const NotifcationSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ToUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: true, default: Date.now },
  Text: { type: String, required: true },
  viewed: { required: false, type: Boolean, default: false },
  decision: { type: String, required: false }
})
const Notification = mongoose.model('Notification', NotifcationSchema);
module.exports = Notification;
