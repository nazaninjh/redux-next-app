'use client'

import { selectAllBlogs, useGetAllBlogsQuery } from "./../../lib/features/blog/blogSlice"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns';
import style from './../page.module.css';
import { selectAllUsers } from "../../lib/features/users/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function Blogpage() {
  // add edit
  // get the first 5 blogs and add pagination
  const {
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllBlogsQuery();
  const [ elipsisClicked, setElipsisClicked ] = useState(false)
  const blogs = useSelector(state => selectAllBlogs(state));
  const users = useSelector(state => selectAllUsers(state));
  let content;
  if (isSuccess) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    content = blogs.map(blog => {
        const user = users.find(user => user.id === blog.userId);
        return (
          <article key={blog.id}
          className={style.blog}>
            <span>
              <button onClick={() => setElipsisClicked(!elipsisClicked)}>
                <FontAwesomeIcon icon={faEllipsisV} inverse/>
              </button>
            </span>
            {elipsisClicked && <div>
              <Link href='/blog/edit'>Edit</Link>
              <Link href='/blog/delete'>Delete</Link>
              </div>}
            
            <h2>Posted by <Link href={`/users/${user.id}`}>{user.name}</Link></h2>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <p>{formatDistance(new Date(blog.date), new Date())}</p>
            <Link href={`blog/${blog.id}`} key={blog.id}>
                View Post
            </Link>
          </article>
            
        )
    }) 
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

