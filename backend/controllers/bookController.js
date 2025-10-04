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
  const book = await Book.findById(req.params.id);

  if (book) {
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await book.remove();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};
const addBook = async (req, res) => {
  const { title, author, description } = req.body;

  const book = new Book({
    title,
    author,
    description,
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

  const { title, author, description } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.description = description || book.description;

  const updatedBook = await book.save();
  res.json(updatedBook);
};
module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};