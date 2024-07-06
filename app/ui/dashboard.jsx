'use client'

import { useSelector } from 'react-redux';
import { selectAllUsers, useGetAllUsersQuery } from './../../lib/features/users/usersSlice';
import { selectAllBlogs, useGetAllBlogsQuery } from '../../lib/features/blog/blogSlice';
import style from './../page.module.css'
import BlogsByUser from './../../components/blogsByUser'
import DeleteFn from '../../components/deleteFn';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export default function Dashboard({ Authuser }) {

    const AuthUserName = Authuser;
    const { data } = useGetAllUsersQuery();
    const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    const user = users.find(user => user.name === Authuser);
    const blogs = useSelector(state => selectAllBlogs(state));
    
    return (
        <>
        <h3>Dashboard</h3>
        <p>{user.name}</p>
        <BlogsByUser userId={user.id}/>
        <Link href={`/users/delete/${user.id}`}>Delete Account</Link>
        </>
        
    )
};