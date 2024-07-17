import BlogsByUser from "../../../../components/blogsByUser"

export default function DashboardBlogsPage({params}) {
  
  return <BlogsByUser userId = {params.userId} />
}
