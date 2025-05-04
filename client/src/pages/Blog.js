import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchBlogs } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await fetchBlogs({ search, category });
        setBlogs(data?.blogs || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    getBlogs();
  }, [search, category]);

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      <div className="row">
        {blogs.length === 0 ? (
          <div className="col-12 text-center">
            <p>No blogs found</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card blog-card h-100">
                <img 
                  src={blog.blog_image_url} 
                  className="card-img-top" 
                  alt={blog.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <span className="badge bg-primary mb-2">{blog.category_name}</span>
                  <p className="card-text text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <Link to={`/blog/${blog._id}`} className="btn btn-outline-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;