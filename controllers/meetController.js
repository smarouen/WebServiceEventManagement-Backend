const mongoose = require('mongoose')
const Meet = require('../models/meets')



exports.createMeet = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userData.userId);
  try {
    const meet = await Meet.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      createdBy: userId,
      usersAllowed: req.body.usersAllowed
    })
    res.status(200).json({
      success: true,
      message: 'Meeting Created Successfully',
      data: meet
    })
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not create the event' });
  }
}

exports.getAllMeets = async (req, res) => {
  try {
    const meets = await Meet.find().populate('usersAllowed createdBy', 'email name');
    res.status(200).json({
      success: true,
      data: meets
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve meets' });
  }
};

exports.getMeetById = async (req, res) => {
  const { meetId } = req.params;
  try {
    const meet = await Meet.findById(meetId).populate('usersAllowed createdBy', 'email name');
    if (!meet) {
      return res.status(404).json({ error: true, message: 'Meet not found' });
    }
    res.status(200).json({
      success: true,
      data: meet
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve the meet' });
  }
};

exports.updateMeetById = async (req, res) => {
  const { meetId } = req.params;
  try {
    const updatedMeet = await Meet.findByIdAndUpdate(meetId, req.body, { new: true });
    if (!updatedMeet) {
      return res.status(404).json({ error: true, message: 'Meet not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Meet updated successfully',
      data: updatedMeet
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not update the meet' });
  }
};


exports.deleteMeetById = async (req, res) => {
  const { meetId } = req.params;
  try {
    const deletedMeet = await Meet.findByIdAndDelete(meetId);
    if (!deletedMeet) {
      return res.status(404).json({ error: true, message: 'Meet not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Meet deleted successfully',
      data: deletedMeet
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not delete the meet' });
  }
};


exports.searchMeets = async (req, res) => {
  const { searchTerm } = req.query;
  console.log('Search term:', searchTerm); // Log to check the received search term

  try {
    const meets = await Meet.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    }).populate('usersAllowed createdBy', 'email');

    res.status(200).json({
      success: true,
      data: meets
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Could not search for meets' });
  }
};
