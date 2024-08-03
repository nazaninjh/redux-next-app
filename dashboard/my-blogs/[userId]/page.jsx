import BlogsByUser from "../../../../components/blogsByUser";
import { getUsers } from "../../../../lib/getUsersAsync";

export async function generateStaticParams() {
  const users = await getUsers();
  if (users) {
    return users.map((user) => ({
      userId: user.id
    }))
  }  
}


export default function DashboardBlogsPage({params}) {
  
  return <BlogsByUser userId = {params.userId} />
}
