import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';



function DocCard({ blog, className = "" }) {
    return (
        <div className={`bg-white w-full md:w-[calc(50%-1rem)] h-[350px] overflow-hidden rounded-lg mb-4 ${className} relative`}>
        <div className="absolute inset-0 bg-gray-300 skew-y-1 transform origin-bottom-right shadow-md rounded-lg"></div>
        <div className="absolute inset-0 bg-white skew-y-1 transform origin-bottom-right shadow-md -translate-x-2 -translate-y-2"></div>
        <div className="relative z-10 h-full flex flex-col justify-between p-6 border-r-4 border-b-4 border-gray-300">
          <div className='h-[85%] overflow-y-auto'>
            <p className='text-sm mb-2 text-gray-800'>{parse(blog.content)}</p>
          </div>
          
          <div className='flex justify-between items-center flex-col md:flex-row mt-4'>
            <p className='font-bold text-lg capitalize'>{blog.title}</p>
            <div className='flex gap-2'>
            <span className='text-gray-600 text-sm md:text-[16px]'>{blog ? blog.createdAt : "4:37 pm"}</span>
              <Link
                to={`/blogs/${blog.id}`} 
                className='text-black hover:underline font-bold ml-1 text-sm md:text-[16px]'
              >
                View Doc
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DocCard;
