'use client'
import { useGetUserQuery, selectUserById } from './../lib/features/users/usersSlice';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import style from './../app/page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
export default function UserComponent({userId}) {
    const [ elipsisClicked, setElipsisClicked ] = useState(false);
    const optionsRef = useRef({current: 1});
    const toggleElipsis = (e) => {
        optionsRef.current = e.target.id;
        setElipsisClicked(!elipsisClicked);
    }
    const {
        isLoading,
        isSuccess,
        isError,
        error
       } = useGetUserQuery(userId);
       const user = useSelector(state => selectUserById(state, userId));
       let content;
       if (isSuccess) {
        content = (
          <section className={style.cardContainer}>
          <article className={style.card}>
          <span>
              <button 
              className={style.optionsBtn}
              id={user.id}
              onClick={(e) => toggleElipsis(e)}>
                <FontAwesomeIcon icon={faEllipsisV}
                style={{fontSize: 'large'}}
                inverse
                />
              </button>
            </span>
            {( elipsisClicked && optionsRef.current === user.id ) && 
            <div className={style.optionsIconNav}>
              <Link href={`/users/edit/${user.id}`}>Edit</Link>
              <Link href={`/users/delete/${user.id}`}>Delete</Link>
            </div>}
            <h1>Name: {user.name}</h1>
            <p>UserName: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone number: {user.phone}</p>
            <p>Adress: </p>
            <p>city: {user.address.city}</p>
            <p>street: {user.address.street}</p>
            <p>Password: {user.password}</p>
          </article>
        </section>
        )
       } else if (isLoading) {
        content = <p>The Data Is Loading...</p>
       } else if (isError) {
        content = <section>Could not find user details!
            <p>{error.data}</p>
        </section>
       }
       return content
}
