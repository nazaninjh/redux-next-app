
import { getUsers } from './../../../lib/getUsersAsync'
// create api functions and recieve data async  
// so we don't have to make the comp client-side
export const generateMetadata = async ({params}) => {
  const users = await getUsers();
  const userId = params.userId;
  const user = await users.find(user => {
    return user.id == userId
  });
  if (user) {
    return {
      title: user.name
    }
  }
  
}

export default function layout( { children } ) {
  return children
}
