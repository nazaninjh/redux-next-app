'use client'
import { selectBlogById, useGetAllBlogsQuery } from "./../lib/features/blog/blogSlice";
import { useSelector } from "react-redux";
import style from './../app/page.module.css';
import { selectUserById, useGetAllUsersQuery } from "./../lib/features/users/usersSlice";
export default function BlogsById({blogId}) {
    const {
        isSuccess,
        isLoading,
        isError,
        error
      } = useGetAllBlogsQuery();
      const blog = useSelector(state => selectBlogById(state, Number(blogId)));
      const {
        data
      } = useGetAllUsersQuery();
      const user = useSelector(state => selectUserById(state, Number(blog.userId)));
      let content;
      if (isSuccess) {
        content = <section className={style.cardContainer}>
          <article className={style.card}>
            <p>Title: {blog.title}</p>
            <p>Content: {blog.body}</p>
            <p>Date: {blog.date}</p>
            {user && <p>Posted by {user.name}</p>}
          </article>
        </section>
        
    } else if (isLoading) {
        content = <p>Loading......</p>
    } 
    else if (isError) {
    content = <div>{error.data}</div>
    } 
      return content
}
