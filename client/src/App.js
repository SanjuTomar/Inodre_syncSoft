import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/CreateBlogs';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlogs'; 
import BlogList from './pages/BlogList';
import  PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
    
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path='list' element={<BlogList />} />
          </Routes>
        </div>
      
    </AuthProvider>
  );
}

export default App;