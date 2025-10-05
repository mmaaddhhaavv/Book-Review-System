const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

const getBooks = async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Book.countDocuments();
  const books = await Book.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ books, page, pages: Math.ceil(count / pageSize) });
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const reviews = await Review.find({ bookId: req.params.id }).populate('userId', 'name');

  const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  res.json({ ...book.toObject(), reviews, averageRating: averageRating.toFixed(1) });
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!book.addedBy || book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this book' });
    }

    await book.deleteOne(); // ✅ safer than .remove()
    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    console.error('DeleteBook error:', error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
};

const addBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;

  if (!title || !author || !description || !genre || !year) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const book = new Book({
    title,
    author,
    description,
    genre,
    year,
    addedBy: req.user._id,
  });

  await book.save();
  res.status(201).json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (book.addedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { title, author, description, genre, year } = req.body;

  book.title = title || book.title;
  book.author = author || book.author;
  book.description = description || book.description;
  book.genre = genre || book.genre;
  book.year = year || book.year;

  const updatedBook = await book.save();
  res.json(updatedBook);
};

const addReview = async (req, res) => {
  const { rating, reviewText } = req.body;
  const { id: bookId } = req.params;

  if (!rating || !reviewText) {
    return res.status(400).json({ message: 'Rating and review text are required' });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const alreadyReviewed = await Review.findOne({
      bookId,
      userId: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      bookId,
      userId: req.user._id,
      rating,
      reviewText,
    });

    console.log('Incoming review:', req.body);
    console.log('Authenticated user:', req.user);

    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  addReview,
};