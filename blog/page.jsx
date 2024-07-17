'use client'

import { selectAllBlogs, useGetAllBlogsQuery } from "./../../lib/features/blog/blogSlice"; 
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDistance } from 'date-fns';
import style from './../page.module.css';
import { selectAllUsers } from "../../lib/features/users/usersSlice";
import BlogsByUser from "../../components/blogsByUser";
import BlogPageSkeleton from "../ui/blogPageSkeleton";
export default function Blogpage() {
 // make it into another component to not use client
  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error
  } = useGetAllBlogsQuery();
  let content;
  if (isSuccess) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    content = <BlogsByUser /> 
  } else if (isLoading) {
    content = <BlogPageSkeleton />
  } else if (isError) {
    content = <div>{error.data}</div>
  } 

  return content
}

