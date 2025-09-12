const express = require('express');
const multer = require('multer');
const Pothole = require('../models/Pothole');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Add pothole
router.post('/', upload.array('media', 5), async (req, res) => {
  try {
    const { userId, description, location } = req.body;
    const media = req.files.map(file => `/uploads/${file.filename}`);

    const pothole = new Pothole({ userId, description, location, media });
    await pothole.save();

    res.status(201).json({ message: 'Pothole reported successfully', pothole });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all potholes
router.get('/', async (req, res) => {
  try {
    const potholes = await Pothole.find().populate('userId', 'name email');
    res.json(potholes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
