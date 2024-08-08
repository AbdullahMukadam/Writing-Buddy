import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userServices } from '../FireBase/Services';
import { authservice } from '../FireBase/Auth';

function UserBlogs({ isExpanded }) {
  const [blogs, setBlogs] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const fetchActiveUser = () => {
      const user = authservice.getCurrentUser();
      if (user) {
        setActiveUser(user);
      } else {
        console.log("No active user found.");
      }
    };
    fetchActiveUser();
  }, []);

  


  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (activeUser) {
        try {
          const allBlogs = await userServices.getDocuments();
          const userBlogs = allBlogs.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((blog) => blog.UserId === activeUser.uid);
          setBlogs(userBlogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }
    };
    fetchUserBlogs();
  }, [activeUser]);

  const displayBlogs = isExpanded ? blogs : blogs.slice(0, 1);

  return (
    <div className='w-full'>
      {displayBlogs.length > 0 ? (
        displayBlogs.map((blog) => (
          <div key={blog.id} className='mb-4 p-4 bg-stone-300 rounded-lg flex gap-3'>
            <img className='h-24' src='./doc.png' alt='Document' />
            <div className='w-full'>
              <h2 className='font-bold text-lg mb-1'>{blog.title}</h2>
              <h1 className='text-sm text-gray-700'>Document</h1>
            </div>
            <Link to={`/blogs/${blog.id}`} className='text-black font-bold text-sm md:text-xl hover:underline'>
              Read more
            </Link>
          </div>
        ))
      ) : (
        <h1 className='font-bold text-gray-600'>No Documents Found, Please Add Some Documents.</h1>
      )}
      {!isExpanded && blogs.length > 1 && (
        <p className='text-gray-500 text-sm'>And {blogs.length - 1} more document(s)...</p>
      )}
    </div>
  );
}

export default UserBlogs;
