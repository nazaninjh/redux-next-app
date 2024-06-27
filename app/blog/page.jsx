'use client'

import { selectAllBlogs, useGetAllBlogsQuery } from "./../../lib/features/blog/blogSlice"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns';
import style from './../page.module.css';
import { selectAllUsers } from "../../lib/features/users/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { current } from "@reduxjs/toolkit";
export default function Blogpage() {
  // add edit
  // get the first 5 blogs and add pagination
  const optionsRef = useRef({current: 1});
  const {
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllBlogsQuery();
  const toggleElipsis = (e) => {
    optionsRef.current = e.target.id;
    setElipsisClicked(!elipsisClicked);
  }
  const [ elipsisClicked, setElipsisClicked ] = useState(false)
  const blogs = useSelector(state => selectAllBlogs(state));
  const users = useSelector(state => selectAllUsers(state));
  let content;
  if (isSuccess) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    content = blogs.map(blog => {
        // console.log('id', blog.id);
        // if (optionsRef.current) {
        //   console.log('class', optionsRef.current)
        // }
        
        const user = users.find(user => user.id === blog.userId);
        return (
          <article key={blog.id}
          className={style.blog}>
            <span>
              <button 
              id={blog.id}
              onClick={(e) => toggleElipsis(e)}>
                <FontAwesomeIcon icon={faEllipsisV}
                style={{fontSize: 'large'}}
                inverse
                />
              </button>
            </span>
            {( elipsisClicked && optionsRef.current === blog.id ) && 
            <div className={style.optionsIconNav}>
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

