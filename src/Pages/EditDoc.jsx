import React from 'react';
import { useLocation } from 'react-router-dom';
import Editor from '../Components/Editor';


function EditBlog() {
  const { state } = useLocation();
  const { blog } = state;

  return <Editor document={blog} />;
}

export default EditBlog;
