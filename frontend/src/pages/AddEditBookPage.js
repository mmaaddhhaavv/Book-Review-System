import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const AddEditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchBook = async () => {
        try {
          const { data } = await axiosInstance.get(`/books/${id}`);
          setFormData({
            title: data.title,
            author: data.author,
            description: data.description,
            genre: data.genre,
            year: data.year
          });
        } catch (err) {
          setError('Failed to fetch book data. You may not be the owner.');
        }
      };
      fetchBook();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...formData,
        year: Number(formData.year) // Ensure year is a number
      };

      if (isEditing) {
        await axiosInstance.put(`/books/${id}`, payload);
      } else {
        await axiosInstance.post('/books', payload);
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} book.`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        {isEditing ? 'Edit Book' : 'Add a New Book'}
      </h2>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Published Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddEditBookPage;