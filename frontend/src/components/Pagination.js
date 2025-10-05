import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) return null;

    return (
        <div className="mt-8 flex justify-center items-center space-x-2">
            {[...Array(pages).keys()].map((p) => (
                <button
                    key={p + 1}
                    onClick={() => onPageChange(p + 1)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        page === p + 1
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                >
                    {p + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;