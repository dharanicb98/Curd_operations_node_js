import React from 'react'
import PostsList from '../pages/postsList'
import AddEditPost from '../pages/addPost'
import { Route, Routes } from "react-router-dom";
import Layout from '../layout';

function ProtectedRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/add" element={<AddEditPost />} />
        <Route path="/edit/:postId" element={<AddEditPost />} />
      </Routes>
    </Layout>
  )
}

export default ProtectedRoutes