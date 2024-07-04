'use client'

import { selectAllBlogs, useGetAllBlogsQuery } from "./../../lib/features/blog/blogSlice"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns';
import style from './../page.module.css';
import { selectAllUsers } from "../../lib/features/users/usersSlice";
import BlogsByUser from "../../components/blogsByUser";
export default function Blogpage() {
  // add edit
  // get the first 5 blogs and add pagination
 
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllBlogsQuery();
  const blogs = useSelector(state => selectAllBlogs(state));
  const users = useSelector(state => selectAllUsers(state));
  let content;
  if (isSuccess) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    content = <BlogsByUser /> 
} else if (isLoading) {
    content = <p>Loading......</p>
} 
else if (isError) {
content = <div>{error}</div>
} 

  return (
    <section className={style.blogContainer}>
      {content}
    </section>
  )
}

