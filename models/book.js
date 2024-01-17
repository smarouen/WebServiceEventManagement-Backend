const mongoose = require('mongoose');
const ReligonBookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  relgion: { type: String, required: true },
  price: { required: true, type: Number }
})
const RelgionBook = mongoose.model('RelgionBook', ReligonBookSchema);
module.exports = RelgionBook;
