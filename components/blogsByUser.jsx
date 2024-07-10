'use client'

import { useGetAllBlogsQuery, selectAllBlogs } from './../lib/features/blog/blogSlice';
import { useGetAllUsersQuery, selectAllUsers } from './../lib/features/users/usersSlice'
import { useSelector } from 'react-redux';
import style from './../app/page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
export default function BlogsByUser( { userId } ) {
   // show only three blogs
   // add pagination 
    const [ elipsisClicked, setElipsisClicked ] = useState(false);
    const optionsRef = useRef({current: 1});
    const toggleElipsis = (e) => {
        optionsRef.current = e.target.id;
        setElipsisClicked(!elipsisClicked);
    }
    const { data } = useGetAllUsersQuery();
    const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    const user = users.find(user => user.id === userId);
    const blogs = useSelector(state => selectAllBlogs(state));
    const blogsByUser = blogs.filter(blog => blog.userId === userId);
   console.log(blogsByUser)
    const paginationCount = userId ? Math.floor(blogsByUser.length / 3) :
    Math.floor(blogs.length / 6);
    const [pageNum, setPageNum] = useState(1);
    console.log(pageNum)
    let pages = [];
    for (let i=1; i <= paginationCount; i++) {
        let content = i;
        pages.push(content)   
    };
    let latestBlogs = userId ? blogsByUser.slice(0, 3) :
    blogs.slice(0, 6);
    const lastBlogIndex = userId ? pageNum * 3 : 
    pageNum * 6;
    const firstBlogIndex = userId ? lastBlogIndex - 3 : 
    lastBlogIndex - 6;
    latestBlogs =  userId ? blogsByUser.slice(firstBlogIndex, lastBlogIndex) :
    blogs.slice(firstBlogIndex, lastBlogIndex);
    const handlePaginationClick = (e) => {
      const num = (e.target.id);
      setPageNum(num);
    }
    let content;
    if (userId) {
        content = latestBlogs.map(blog => {
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
              <Link href={`/blog/edit/${blog.id}`}>Edit</Link>
              <Link href={`/blog/delete/${blog.id}`}>Delete</Link>
            </div>}

            <h2>Posted by <Link href={`/users/${user.id}`}>{user.name}</Link></h2>
            <h4>{blog.title}</h4>
            <p>{blog.body}</p>
            <p>{formatDistance(new Date(blog.date), new Date())}</p>
            <Link href={`blog/${blog.id}`} key={blog.id}>
                View Post
            </Link>
          </article>
        )
        })
    } else if (!userId) {
        content = latestBlogs.map(blog => {
          
            const user = users.find(user => Number(user.id) === Number(blog.userId));
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
              <Link href={`/blog/edit/${blog.id}`}>Edit</Link>
              <Link href={`/blog/delete/${blog.id}`}>Delete</Link>
            </div>}
            
            {user && <h2>Posted by <Link href={`/users/${user.id}`}>{user.name}</Link></h2>}
            <h4>{blog.title}</h4>
            <p>{blog.body}</p>
            <p>{formatDistance(new Date(blog.date), new Date())}</p>
            <Link href={`blog/${blog.id}`} key={blog.id}>
                View Post
            </Link>
          </article>
            )
        })
    }
    return (
        <>
        {content}
        <section className={style.paginationCont}>
        {pages.map(pageNum => {
            return (
              <button key={pageNum}
              id={pageNum}
              onClick={(e) => handlePaginationClick(e)}
              className={style.paginationBtn}>
                {pageNum}
            </button>
            )
        })}
        </section>
        </>
    )
        
}
