'use client'

import { useSelector } from 'react-redux';
import { selectAllUsers, useGetAllUsersQuery } from './../../lib/features/users/usersSlice';
import { selectAllBlogs, useGetAllBlogsQuery } from '../../lib/features/blog/blogSlice';
import style from './../page.module.css'
import BlogsByUser from './../../components/blogsByUser'

export default function Dashboard({ Authuser }) {
    const AuthUserName = Authuser;
    const { data } = useGetAllUsersQuery();
    const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    const user = users.find(user => user.name === Authuser);
    const blogs = useSelector(state => selectAllBlogs(state));
    const blogsByUser = blogs.filter(blog => blog.userId === user.id);
    
    return (
        <>
        <p>{`${user.name}'s Dashboard`}</p>
        <BlogsByUser userId={user.id}/>
        </>
        
    )
}