import DeleteFn from "./../../../../components/deleteFn";
import { getUsers } from "../../../../lib/getUsersAsync";
export async function generateStaticParams() {
  const users = await getUsers();
  if (users) {
    return users.map((user) => ({
      id: user.id
    }))
  }
  
}

export default function DeletePage({ params }) {
  return (
    <DeleteFn id={params.id} type='user' />  
  )
}
