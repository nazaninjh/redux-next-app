import Link from "next/link"

export default function Profile({ id }) {
  return (
    <Link href={`/users/delete/${id}`}>Delete Account</Link>
  )
}
