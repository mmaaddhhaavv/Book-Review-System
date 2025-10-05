const express = require('express');
const router = express.Router();
const { getBooks, getBookById, addBook, updateBook, deleteBook,addReview } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBooks).post(protect, addBook);
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);
router.post('/:id/reviews', protect, addReview);

module.exports = router;