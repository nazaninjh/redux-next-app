
import EditBlog from './../../../ui/edit-blog'
import { getBlogs } from '../../../../lib/getBlogsAsync';
export async function generateStaticParams() {
  const blogs = await getBlogs();
  if (blogs) {
    return blogs.map(blog => ({
      blogId: blog.id
    }))
  }
}

export default function EditBlogPage({ params }) {
  return (
    <EditBlog blogId={params.blogId}/>
  )
}
