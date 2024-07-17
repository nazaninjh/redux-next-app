import EditUser from './../../../ui/edit-user';
import { getUsers } from '../../../../lib/getUsersAsync';
export async function generateStaticParams() {
  const users = await getUsers();
  if (users) {
    return users.map((user) => ({
      id: user.id
    }))
  } 
}

export default function EditPage({ params }) {
  const id = params.id;
  return (
    <EditUser id={id} />
  )
}
