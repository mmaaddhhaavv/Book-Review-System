import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center mb-2">
                <p className="font-semibold text-slate-800 mr-4">{review.userId?.name || 'Anonymous'}</p>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-slate-600">{review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;