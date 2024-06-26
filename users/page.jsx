/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Link from "next/link";
import { selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice"
import { useSelector } from "react-redux";
import style from './../page.module.css'


export default function UsersPage() {
    const {
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
                <Link href={`users/${user.id}`} key={user.id}>
                    {user.name}
                </Link>
            )
        }) 
    } else if (isLoading) {
        content = <p>Loading......</p>
    } 
    else if (isError) {
    content = <div>{error}</div>
    } 

  
  return (
    <ul className={style.users}>
        {content}
    </ul>
  )
}
