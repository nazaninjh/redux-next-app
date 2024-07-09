
import Link from 'next/link'
import './../globals.css'


export default function DashboardSidenav({ id }) {
  return (
    <nav className='sidenav'>
        <Link href={`/dashboard/profile/${id}`}>Profile</Link>
        <Link href={`/blog/usersBlog/${id}`}>My Blogs</Link>
    </nav>
  )
}
