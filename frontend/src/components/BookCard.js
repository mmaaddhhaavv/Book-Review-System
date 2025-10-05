import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{book.title}</h3>
            <p className="text-slate-600 mb-1">by {book.author}</p>
            <p className="text-sm text-slate-500 mb-4">{book.genre} - {book.publishedYear}</p>
            <p className="text-slate-700 mb-4 line-clamp-3">{book.description}</p>
            <Link 
                to={`/books/${book._id}`} 
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
                View Details &rarr;
            </Link>
        </div>
    );
};

export default BookCard;