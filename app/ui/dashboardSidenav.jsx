
import Link from 'next/link'
import './../globals.css'


export default function DashboardSidenav({ userId }) {
  return (
    <nav className='sidenav'>
        <Link href={`/dashboard/profile/${userId}`}>Profile</Link>
        <Link href={`/dashboard/my-blogs/${userId}`}>My Blogs</Link>
    </nav>
  )
}
