import BlogsById from './../../../components/blogsById';
import { getBlogs } from '../../../lib/getBlogsAsync';

export async function generateStaticParams() {
  const blogs = await getBlogs();
  if (blogs) {
    return blogs.map(blog => ({
      blogId: blog.id
    }))
  } 
}

export default function BlogPage({ params }) {
  return <BlogsById blogId={params.blogId} />
}
