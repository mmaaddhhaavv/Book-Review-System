import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const { data } = await axiosInstance.get(`/books?pageNumber=${page}`);
                setBooks(data.books);
                setPages(data.pages);
            } catch (error) {
                console.error("Failed to fetch books", error);
            }
            setLoading(false);
        };
        fetchBooks();
    }, [page]);

    return (
        <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-8">Discover Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map(book => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                    <Pagination page={page} pages={pages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default BookListPage;