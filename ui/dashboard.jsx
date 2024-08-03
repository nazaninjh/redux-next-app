'use client'

import { useSelector } from 'react-redux';
import { selectAllUsers, useGetAllUsersQuery } from './../../lib/features/users/usersSlice';
// import { selectAllBlogs, useGetAllBlogsQuery } from '../../lib/features/blog/blogSlice';
import BlogsByUser from './../../components/blogsByUser'
import DashboardSidenav from './dashboardSidenav';
import './../globals.css';
import { useEffect, useState } from 'react';
export default function Dashboard({ Authuser }) {
    const [ loggedUser, setLoggedUser ] = useState(null);
    const store = window.localStorage;
    store.setItem('user', Authuser);
    const storeUser = store.user.toLowerCase();
    const AuthUserLowerCase = Authuser.toLowerCase();
    // const { data } = useGetAllUsersQuery();
    // const { data: blogData } = useGetAllBlogsQuery();
    const users = useSelector(state => selectAllUsers(state));
    // const logedUser = users.find(user => {
    //     console.log(user.username.toLowerCase() === storeUser)
    //     if (store.getItem('user')) {
    //         return user.username.toLowerCase() === storeUser
    //     } else {
    //         return user.username.toLowerCase() === AuthUserLowerCase
    //     }
    // });
    useEffect(() => {
        let logged = users.find(user => {
            console.log(user.username.toLowerCase() === storeUser)
            if (store.getItem('user')) {
                return user.username.toLowerCase() === storeUser
            } else {
                return user.username.toLowerCase() === AuthUserLowerCase
            }
        });
        setLoggedUser(logged)
    }, [storeUser, AuthUserLowerCase, users])
    return (
        <section className='dashboard-cont'>
        {loggedUser && <>
            <DashboardSidenav userId={loggedUser.id}/>
            <BlogsByUser userId={loggedUser.id}/>
        </>}
        </section>
    )
        
        
    
};