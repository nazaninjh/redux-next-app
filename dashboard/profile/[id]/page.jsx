import Profile from "../../../ui/profile"
import { getUsers } from './../../../../lib/getUsersAsync';
export async function generateStaticParams() {
  const users = await getUsers();
  if (users) {
    return users.map((user) => ({
      id: user.id
    }))
  }
}

export default function ProfilePage({ params }) {
  return (
    <Profile id={params.id} />
  )
}
