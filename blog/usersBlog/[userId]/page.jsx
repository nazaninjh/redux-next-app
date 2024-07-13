'use client'
import { 
  useGetAllBlogsQuery,
   selectAllBlogs
} from './../../../../lib/features/blog/blogSlice'
import { useSelector } from 'react-redux';
import './../../../globals.css';
import style from './../../../page.module.css';
import Link from 'next/link';
export default function BlogsByUser({ params }) {
   const userId = params.userId;
   const {
        data,
        isSuccess,
        isLoading,
        isError,
        error
    }  = useGetAllBlogsQuery();
   const blogs = useSelector(state => selectAllBlogs(state));
   const blogsByUser = blogs.filter(element => {
    return Number(element.userId) === Number(userId);
   })
   let content; 
   if (blogsByUser.length === 0) {
    content = <div className='no-blogs-div'>
    <p>No blogs Posted yet!</p>
    <Link href='/blog/create'>Post a blog</Link>
    </div>
   } else if (isSuccess) {
    content = (<section className={style.cardContainer}>
      { blogsByUser.map(blog => {
        return (
        <article key={blog.id}
        className={style.card}>
          <p>Title: {blog.title}</p>
          <p>Content: {blog.body}</p>
          <p>Date: {blog.date}</p>
        </article>
        )
      })}
    </section>)
   } else if (isLoading) {
    content = <p>The Data Is Loading...</p>
   } else if (isError) {
    content = <section>Could not find Posts!
        <p>{error.data}</p>
    </section>
   }
  return (
    <section>
      {content}
    </section>
  )
}
