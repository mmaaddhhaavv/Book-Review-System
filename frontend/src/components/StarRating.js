import React from 'react';

const StarRating = ({ rating, setRating, readOnly = true }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center">
            {stars.map((star) => (
                <span
                    key={star}
                    className={`text-2xl ${!readOnly ? 'cursor-pointer' : ''} ${
                        rating >= star ? 'text-yellow-400' : 'text-slate-300'
                    }`}
                    onClick={() => !readOnly && setRating(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;