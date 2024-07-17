import UserComponent from './../../../components/user';
import { getUsers } from '../../../lib/getUsersAsync';
export async function generateStaticParams() {
  const users = await getUsers();
  if (users) {
    return users.map((user) => ({
      userId: user.id
    }))
  }  
}

export default function Userpage({ params }) {
  const userId = params.userId;
  
   return <UserComponent userId={userId} />
  
}

