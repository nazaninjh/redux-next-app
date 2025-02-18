'use client'
import { selectAllBlogs, selectBlogById, useGetAllBlogsQuery } from "./../lib/features/blog/blogSlice";
import { useSelector } from "react-redux";
import style from './../app/page.module.css';
import { selectUserById, useGetAllUsersQuery } from "./../lib/features/users/usersSlice";
import { format } from "date-fns";
import SingleBlogSkeleton from "../app/ui/singleBlogSkeleton";
export default function BlogsById({blogId}) {
    const {
        isSuccess,
        isLoading,
        isError,
        error
      } = useGetAllBlogsQuery();
      const blog = useSelector(state => selectBlogById(state, blogId))
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
            <p>Date: {format(new Date(blog.date), 'yyyy, MMMM, dd')}</p>
            {user && <p>Posted by {user.name}</p>}
          </article>
  
        </section>
        
    } else if (isLoading) {
        content = <SingleBlogSkeleton />
    } 
    else if (isError) {
    content = <div>{error.data}</div>
    } 
      return content
}
