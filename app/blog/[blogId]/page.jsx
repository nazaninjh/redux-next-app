'use client'

import { selectBlogById, useGetAllBlogsQuery } from "./../../../lib/features/blog/blogSlice";
import { useSelector } from "react-redux";


import { selectUserById, useGetAllUsersQuery } from "./../../../lib/features/users/usersSlice";
export default function BlogPage({ params }) {
  const {
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllBlogsQuery();
  const blogId = params.blogId;
  const blog = useSelector(state => selectBlogById(state, blogId));
  const {
    data
  } = useGetAllUsersQuery();
  const user = useSelector(state => selectUserById(state, blog.userId));
  let content;
  if (isSuccess) {
    content = <section>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
      <p>Author: {user && user.name}</p>
    </section>
} else if (isLoading) {
    content = <p>Loading......</p>
} 
else if (isError) {
content = <div>{error.toString()}</div>
} 
  return content
}
