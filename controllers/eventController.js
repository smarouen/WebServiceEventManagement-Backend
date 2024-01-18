const mongoose = require('mongoose')
const Event = require('../models/event')



exports.createEvent = async (req, res) => {
  
  const userId = new mongoose.Types.ObjectId(req.userData.userId);
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      localisation : req.body.localisation,
      date: req.body.date,
      entry_price:req.body.entry_price,
    })
    res.status(200).json({
      success: true,
      message: 'Event Created Successfully',
      data: event
    })
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not create the event' });
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve events' });
  }
};

exports.getEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ error: true, message: 'event not found' });
    }
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve the event' });
  }
};

exports.updateEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const updateEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    if (!updateEvent) {
      return res.status(404).json({ error: true, message: 'event not found' });
    }
    res.status(200).json({
      success: true,
      message: 'event updated successfully',
      data: updateEvent
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not update the event' });
  }
};


exports.deleteEventById = async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: true, message: 'event not found' });
    }
    res.status(200).json({
      success: true,
      message: 'event deleted successfully',
      data: deletedEvent
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: 'Could not delete the event' });
  }
};


