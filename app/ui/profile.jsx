'use client'
import Link from "next/link"
import { useSelector } from "react-redux"
import { selectUserById } from "../../lib/features/users/usersSlice"
import style from './../page.module.css';
export default function Profile({ id }) {
  const user = useSelector(state => selectUserById(state, id));
  console.log(user)
  return (
    <section className={style.cardContainer}>
      <article className={style.largeCard}>
        <h1>Name: {user.name}</h1>
        <p>UserName: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone number: {user.phone}</p>
        <p>Adress: </p>
        <p>city: {user.address.city}</p>
        <p>street: {user.address.street}</p>
        <p>Password: {user.password}</p>
        <div className={style.btnsCont}>
          <Link href={`/users/edit/${id}`}>Edit Account</Link>
          <Link href={`/users/delete/${id}`}>Delete Account</Link>
        </div>
      </article>
    </section>
    
  )
}
