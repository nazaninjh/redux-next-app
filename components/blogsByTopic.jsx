'use client'
import { useSelector } from 'react-redux';
import { selectAllBlogs, useGetAllBlogsQuery } from './../lib/features/blog/blogSlice';
import Link from 'next/link';
export default function BlogsByTopic() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess
  } = useGetAllBlogsQuery();
  const blogs = useSelector(state => selectAllBlogs(state));
  const topBlogs = blogs.slice(0, 10);
  const titles = topBlogs.map(blog => {
    return <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
  })
  let content;
  if (isSuccess) {
      content = titles;
  } else if (isLoading) {
      content = <p>Loading...</p>
  } else if (isError) {
      content = <div>{error.data}</div>
  } 

  return content
}
