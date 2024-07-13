/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Link from "next/link";
import { selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice"
import { useSelector } from "react-redux";
import style from './../page.module.css';
import UsersSkeleton from "./usersSkeleton";


export default function Users() {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetAllUsersQuery()
    let content;
    const users = useSelector(state => selectAllUsers(state));
    
    if (isSuccess) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log('success')
        content = users.map(user => {
            return (
                <article className={style.card}>
                    <Link href={`users/${user.id}`} key={user.id}>
                        {user.name}
                    </Link>
                </article>
            )
        }) 
    } else if (isLoading) {
        content = <UsersSkeleton />
    } 
    else if (isError) {
    content = <div>{error}</div>
    } 

  
  return (
    <section className={style.cardContainer}>
        {content}
    </section>
  )
}
