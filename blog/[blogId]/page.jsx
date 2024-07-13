import BlogsById from './../../../components/blogsById';


export default function BlogPage({ params }) {
  // how to show date more understandable?
  return <BlogsById blogId={params.blogId} />
}
