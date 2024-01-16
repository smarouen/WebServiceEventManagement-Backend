const mongoose = require('mongoose');
const MeetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  usersAllowed:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  status: { type: String, default: "offline" },
  isDone: { required: false, type: Boolean, default: false }
})
const Meet = mongoose.model('Meet', MeetSchema);
module.exports = Meet;
