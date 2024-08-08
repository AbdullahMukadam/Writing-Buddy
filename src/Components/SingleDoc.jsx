import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userServices } from '../FireBase/Services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonBtn from './CommonBtn';
import parse from 'html-react-parser';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = await userServices.getDocument(id);
      if (blogDoc.exists()) {
        setBlog({ id: blogDoc.id, ...blogDoc.data() });
      } else {
        toast.error('Blog not found!');
        navigate('/home');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/edit-blog/${id}`, { state: { blog } });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      const result = await userServices.deleteDocument(id);
      if (!result) {
        toast.success('Blog deleted successfully!');
        navigate('/home');
      } else {
        toast.error('Failed to delete blog. Please try again.');
      }
    }
  };

  return (
    <div className='w-full h-screen p-4 flex items-center justify-center'>
      {blog ? (
        <div className='w-[80%] h-[90%] bg-white rounded-lg p-4'>
          <h2 className='font-bold md:text-xl capitalize mb-1'>{blog.title}</h2>
          <div className='h-[80%] overflow-y-auto'>
          <p className='text-sm text-gray-700'> {parse(blog.content)}</p>
          </div>          
          <div className='w-full flex items-center justify-between mt-2 gap-7'>
           <CommonBtn className='text-white w-[30%]' onClick={handleEdit}>Edit Doc</CommonBtn>
           <CommonBtn className='text-white w-[30%] bg-red-700' onClick={handleDelete}>Delete</CommonBtn>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogDetail;
