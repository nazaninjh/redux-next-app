'use client'
import { 
  useGetAllBlogsQuery,
   selectAllBlogs
} from './../../../../lib/features/blog/blogSlice'
import { useSelector } from 'react-redux';
import style from './../../../page.module.css'
export default function blogsByUser({ params }) {
   const userId = params.userId
   const {
        data,
        isSuccess,
        isLoading,
        isError,
        error
    }  = useGetAllBlogsQuery();
   const blogs = useSelector(state => selectAllBlogs(state));
   const blogsByUser = blogs.filter(element => {
    return element.userId === userId;
   })
   let content; 
   if (isSuccess) {
    content = <section className={style.userDetails}>
    {/* get first three posts only */}
      { blogsByUser.map(blog => {
        return (
        <article key={blog.id}>
          <p>Title: {blog.title}</p>
          <p>Content: {blog.content}</p>
          <p>DateL {blog.date}</p>
        </article>
        )
      })}
    </section>
   } else if (isLoading) {
    content = <p>The Data Is Loading...</p>
   } else if (isError) {
    content = <section>Could not find Posts!
        <p>{error}</p>
    </section>
   }
  return content
}
