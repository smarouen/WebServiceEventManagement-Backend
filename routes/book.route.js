const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.post("/", bookController.createBook)
router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.put('/:bookId', bookController.updateBookById);
router.delete('/:bookId', bookController.deleteBookById);

module.exports = router;
