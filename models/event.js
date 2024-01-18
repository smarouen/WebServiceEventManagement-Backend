const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  localisation : {type :String , required:true},
  date:{type:Date},
  entry_price: { required: true, type: Number },
  createdAt: { type: Date, default: Date.now }
  
})
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
