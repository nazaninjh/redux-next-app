'use client'

import { selectAllBlogs, useGetAllBlogsQuery } from './../../../lib/features/blog/blogSlice';
import { selectUserById, useGetUserQuery } from './../../../lib/features/users/usersSlice';
import style from './../../page.module.css'
import { useSelector } from 'react-redux';
import Link from 'next/link';
export default function Userpage({ params }) {
  const userId = params.userId;
  const {
    isLoading,
    isSuccess,
    isError,
    error
   } = useGetUserQuery(userId);
   const user = useSelector(state => selectUserById(state, userId));
   let content;
   if (isSuccess) {
    content = (<section className={style.userDetails}>
    <h1>{user.name}</h1>
    <p>Details 👇</p>
    <p>id: {user.id}</p>
    <p>email: {user.email}</p>
    <Link href={`/blog/usersBlog/${userId}`}>users Posted Bogs</Link>
    </section>)
   } else if (isLoading) {
    content = <p>The Data Is Loading...</p>
   } else if (isError) {
    content = <section>Could not find user details!
        <p>{error.data}</p>
    </section>
   }
   return (
    content
   )
  
}
