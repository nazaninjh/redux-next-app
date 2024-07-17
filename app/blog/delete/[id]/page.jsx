
import DeleteFn from "../../../../components/deleteFn";
import { getBlogs } from './../../../../lib/getBlogsAsync';
export async function generateStaticParams() {
  const blogs = await getBlogs();
  if (blogs) {
    return blogs.map(blog => ({
      id: blog.id
    }))
  } 
}

export default function DeletePage({ params }) {
  return (
    <DeleteFn id={params.id} type='blog' />  
  )
}
