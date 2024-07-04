
import EditBlog from './../../../ui/edit-blog'

export default function EditBlogPage({ params }) {
  return (
    <EditBlog blogId={params.blogId}/>
  )
}
