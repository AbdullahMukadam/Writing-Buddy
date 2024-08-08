import React, { useState, useEffect } from 'react';
import Input from '../Components/Input';
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DocCard from '../Components/DocCard';
import { userServices } from '../FireBase/Services';
import UserBlogs from '../Components/AllDocs';
import { authservice } from '../FireBase/Auth';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [userBlogsExpanded, setUserBlogsExpanded] = useState(false);
  const [filterDoc, setFilterDoc] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const fetchActiveUser = () => {
      const user = authservice.getCurrentUser();
      if (user) {
        
        setActiveUser(user);
      } else {
        console.log("No active user");
      }
    };
    fetchActiveUser();
  }, []);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      const allBlogs = await userServices.getDocuments();
      const recentBlogs = allBlogs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Filter to find the blogs of the active user
      const userSpecificBlogs = activeUser
        ? recentBlogs.filter((blog) => blog.UserId === activeUser.uid)
        : [];

      setBlogs(userSpecificBlogs);
    };

    fetchRecentBlogs();
  }, [activeUser]); // Add activeUser as a dependency to refetch blogs when the active user changes

  const toggleUserBlogs = () => {
    setUserBlogsExpanded(!userBlogsExpanded);
  };

  const FilteredDocs = blogs.filter((doc) =>
    doc.title.toLowerCase().includes(filterDoc.toLowerCase())
  );

  return (
    <div className="w-full p-5 overflow-hidden relative">
      <div
        className={`w-full border-b-2 border-gray-300 transition-all duration-300 ease-in-out ${
          userBlogsExpanded ? "h-[calc(100vh-2rem)] overflow-y-auto" : "h-56 overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-xl">All Documents</h2>
          <button
            onClick={toggleUserBlogs}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
          >
            {userBlogsExpanded ? <IoMdClose size={24} /> : "Expand"}
          </button>
        </div>
        <div className="p-2">
          <UserBlogs isExpanded={userBlogsExpanded} />
        </div>
      </div>

      <div className="w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Recent Documents</h1>
        <div className="w-full md:w-[40%] relative">
          <Input
            placeholder="Search"
            className="w-full bbg-stone-300 border-gray-300 text-gray-900 font-medium pl-4 pr-10 py-2 rounded-lg "
            onChange={(e) => setFilterDoc(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>
      </div>

      <div className="w-full p-2">
        {blogs.length > 0 ? (
          <div className="w-full p-3 md:flex gap-x-5 flex-wrap">
            {FilteredDocs.map((blog) => (
              <DocCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p>No recent documents available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
