import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [newReview, setNewReview] = useState({ rating: 0, reviewText: '' });
    const [, setError] = useState('');

    const fetchBookDetails = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get(`/books/${id}`);
            setBook(data);
        } catch (err) {
            console.error(err);
            
            setError('Failed to load book details.');
        }
    }, [id]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails]);

    const handleReviewSubmit = async (e) => {
  e.preventDefault();

  // Basic frontend validation
  if (newReview.rating < 1 || newReview.reviewText.trim() === '') {
    alert('Please provide a valid rating and review text.');
    return;
  }

  try {
    // Send payload matching your Review schema
    await axiosInstance.post(`/books/${id}/reviews`, {
      rating: newReview.rating,
      reviewText: newReview.reviewText, // ✅ matches schema field
    });

    // Reset form and refresh book details
    setNewReview({ rating: 0, reviewText: '' });
    fetchBookDetails();
  } catch (err) {
    console.error('Review submission error:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Failed to submit review.');
  }
};


    const handleDeleteBook = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axiosInstance.delete(`/books/${id}`);
                navigate('/');
            } catch (err) {
                console.error(err);
                alert('You are not authorized to delete this book.');
            }
        }
    };

    if (!book) return <div>Loading...</div>;

    const isOwner = user && user.id === book.addedBy._id;

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold">{book.title}</h1>
                        <p className="text-xl text-slate-600 mt-1">by {book.author}</p>
                        <p className="text-md text-slate-500 mt-1">{book.genre} - {book.publishedYear}</p>
                        <div className="mt-2 flex items-center">
                            <StarRating rating={book.averageRating} />
                            <span className="ml-2 text-slate-600">({book.reviews.length} reviews)</span>
                        </div>
                    </div>
                    {isOwner && (
                         <div className="flex space-x-2">
                            <Link to={`/edit-book/${book._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Edit</Link>
                            <button onClick={handleDeleteBook} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                        </div>
                    )}
                </div>
                <p className="mt-6 text-slate-700">{book.description}</p>
                 <p className="mt-4 text-sm text-slate-500">Added by: {book.addedBy.name}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {user && (
                    <form onSubmit={handleReviewSubmit} className="mb-8 p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
                        <div className="mb-2">
                             <StarRating rating={newReview.rating} setRating={(r) => setNewReview({...newReview, rating: r})} readOnly={false} />
                        </div>
                        <textarea
                            value={newReview.reviewText}
                            onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                            placeholder="Write your review..."
                            className="w-full p-2 border rounded-md"
                            rows="3"
                        ></textarea>
                        <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Submit</button>
                    </form>
                )}
                <div className="space-y-4">
                    {book.reviews.length > 0 ? (
                        book.reviews.map(review => <ReviewCard key={review._id} review={review} />)
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;