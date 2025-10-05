import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// ✅ FIX THE FILENAME HERE
import AddEditBookPage from './pages/AddEditBookPage'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // <>
<div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">     
       {/* <main className="container mx-auto px-4 py-8">  */}
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route path="/add-book" element={<ProtectedRoute><AddEditBookPage /></ProtectedRoute>} />
          <Route path="/edit-book/:id" element={<ProtectedRoute><AddEditBookPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

// ✅ ADD THIS EXPORT STATEMENT AT THE END
export default App;