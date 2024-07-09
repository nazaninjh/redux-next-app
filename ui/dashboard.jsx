'use client'

import { useSelector } from 'react-redux';
import { selectAllUsers, useGetAllUsersQuery } from './../../lib/features/users/usersSlice';
import { selectAllBlogs, useGetAllBlogsQuery } from '../../lib/features/blog/blogSlice';
import BlogsByUser from './../../components/blogsByUser'
import DeleteFn from '../../components/deleteFn';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardSidenav from './dashboardSidenav';
import './../globals.css'
export default function Dashboard({ Authuser }) {

    const AuthUserName = Authuser;
    const { data } = useGetAllUsersQuery();
    // const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    const logedUser = users.find(user => user.username.toLowerCase() === Authuser);
    // const blogs = useSelector(state => selectAllBlogs(state));
    
    return (
        <section className='dashboard-cont'>
        <DashboardSidenav id={logedUser.id}/>
        <section className='dashboard-blogs-cont'>
        <BlogsByUser userId={logedUser.id}/>
        </section>
        </section>
        
    )
};