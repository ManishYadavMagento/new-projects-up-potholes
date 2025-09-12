const mongoose = require('mongoose');

const potholeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  media: [{ type: String }], // store file paths
}, { timestamps: true });

module.exports = mongoose.model('Pothole', potholeSchema);
