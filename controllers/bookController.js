const mongoose = require('mongoose')
const RelgionBook = require('../models/book')



exports.createBook = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userData.userId);
  try {
    const book = await RelgionBook.create({
      title: req.body.title,
      description: req.body.description,
      price:req.body.price,
      relgion:req.body.relgion
    })
    res.status(200).json({
      success: true,
      message: 'book Created Successfully',
      data: book
    })
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not create the book' });
  }
}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await RelgionBook.find()
    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve books' });
  }
};

exports.getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await RelgionBook.findById(bookId)
    if (!book) {
      return res.status(404).json({ error: true, message: 'book not found' });
    }
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not retrieve the book' });
  }
};

exports.updateBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const updatedBook = await RelgionBook.findByIdAndUpdate(bookId, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: true, message: 'book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Could not update the book' });
  }
};


exports.deleteBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const deletedBook = await RelgionBook.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: true, message: 'book not found' });
    }
    res.status(200).json({
      success: true,
      message: 'book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: 'Could not delete the book' });
  }
};


