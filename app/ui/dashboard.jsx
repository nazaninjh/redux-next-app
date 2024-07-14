'use client'

import { useSelector } from 'react-redux';
import { selectAllUsers, useGetAllUsersQuery } from './../../lib/features/users/usersSlice';
// import { selectAllBlogs, useGetAllBlogsQuery } from '../../lib/features/blog/blogSlice';
import BlogsByUser from './../../components/blogsByUser'
import DashboardSidenav from './dashboardSidenav';
import './../globals.css';
import style from './../page.module.css'
export default function Dashboard({ Authuser }) {

    const AuthUserName = Authuser.toLowerCase();
    const { data } = useGetAllUsersQuery();
    // const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    const logedUser = users.find(user => user.username.toLowerCase() === AuthUserName);
    console.log(logedUser)
    // const blogs = useSelector(state => selectAllBlogs(state));
    
    return (
        <section className='dashboard-cont'>
        <DashboardSidenav id={logedUser.id}/>
        <BlogsByUser userId={logedUser.id}/>
        </section>
        
    )
};