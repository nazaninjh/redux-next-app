'use client'

import { useGetAllBlogsQuery, selectAllBlogs } from './../lib/features/blog/blogSlice';
import { useGetAllUsersQuery, selectAllUsers } from './../lib/features/users/usersSlice'
import { useSelector } from 'react-redux';
import style from './../app/page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
export default function BlogsByUser( { userId } ) {
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
    const blogsByUser = blogs.filter(blog => Number(blog.userId) === Number(userId));
    Math.floor(blogs.length / 6);
    const paginationCount = userId ? Math.floor(blogsByUser.length / 3) :
    Math.floor(blogs.length / 6);
    const [pageNum, setPageNum] = useState(1);
    const lastBlogIndex = userId ? pageNum * 3 : 
    pageNum * 6;
    const firstBlogIndex = userId ? lastBlogIndex - 3 : 
    lastBlogIndex - 6;
   
    let pages = [1, 2, 3];
    
    let latestBlogs = userId ? blogsByUser.slice(0, 3) :
    blogs.slice(0, 6);
    
    latestBlogs = userId ? blogsByUser.slice(firstBlogIndex, lastBlogIndex)
    : blogs.slice(firstBlogIndex, lastBlogIndex);


    const handlePaginationClick = (e) => {
      const num = (e.target.id);
      setPageNum(num);
    };
    
    const goNext = () => {
      console.log('next');
      if (pageNum < paginationCount) {
        setPageNum((prev) => prev + 1)
      }
    }
    const goBack = () => {
      if (pageNum > 1) {
        setPageNum((prev) => prev - 1);
      }
     
    };
  
    let content;
    if (userId && blogsByUser.length === 0) {
      content = <div className='no-blogs-div'>
        <p>No blogs Posted yet!</p>
        <Link href='/blog/create'>Post a blog</Link>
      </div>
    } else if (userId) {
        
        content = latestBlogs.map(blog => {
        return (
          <article key={blog.id}
           className={style.card}>
            <span>
              <button 
              className={style.optionsBtn}
              id={blog.id}
              onClick={(e) => toggleElipsis(e)}>
                <FontAwesomeIcon icon={faEllipsisV}
                style={{fontSize: 'large'}}
                inverse
                />
              </button>
            </span>
            {( elipsisClicked && Number(optionsRef.current) === Number(blog.id) ) && 
            <div className={style.optionsIconNav}>
              <Link href={`/blog/edit/${blog.id}`}>Edit</Link>
              <Link href={`/blog/delete/${blog.id}`}>Delete</Link>
            </div>}

            <h2>Posted by <Link href={`/users/${user.id}`}>{user.name}</Link></h2>
            <h4>{blog.title}</h4>
            <p>{blog.body}</p>
            <p>{formatDistance(new Date(blog.date), new Date())}</p>
            <Link href={`/blog/${blog.id}`} key={blog.id}>
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
           className={style.card}>
            <span>
              <button 
              className={style.optionsBtn}
              id={blog.id}
              onClick={(e) => toggleElipsis(e)}>
                <FontAwesomeIcon icon={faEllipsisV}
                style={{fontSize: 'large'}}
                inverse
                />
              </button>
            </span>
            {( elipsisClicked && Number(optionsRef.current) === Number(blog.id) ) && 
            <div className={style.optionsIconNav}>
              <Link href={`/blog/edit/${blog.id}`}>Edit</Link>
              <Link href={`/blog/delete/${blog.id}`}>Delete</Link>
            </div>}
            
            {user && <h2>Posted by <Link href={`/users/${user.id}`}>{user.name}</Link></h2>}
            <h4>{blog.title}</h4>
            <p>{blog.body}</p>
            <p>{formatDistance(new Date(blog.date), new Date())}</p>
            <Link href={`/blog/${blog.id}`} key={blog.id}>
                View Post
            </Link>
          </article>
            )
        })
    }
    return (
        <>
        {!userId &&  <section className={style.cardContainer}>
        {content}
        <section className={style.paginationCont}>
        
        <button className={style.paginationNavBtn} 
        onClick={() => goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
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
        <button className={style.paginationNavBtn}
        onClick={() => goNext()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </section></section>}

        {blogsByUser.length !== 0 && userId &&
        <section className={style.cardContainer}>
        {content}
        <section className={style.paginationCont}>
        <button className={style.paginationNavBtn} 
        onClick={() => goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
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
        <button className={style.paginationNavBtn}
        onClick={() => goNext()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </section>
      </section>}
      {/* {userId && blogsByUser.length !== 0 && content} */}
        
        </>
    )
        
}
