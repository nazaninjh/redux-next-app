
import {getBlogs} from './../../../lib/getBlogsAsync';
import {getUsers} from './../../../lib/getUsersAsync';

export const generateMetadata = async ({params}) => {
    const blogId = params.blogId;
    const blogs = await getBlogs();
    
    const blog = blogs.find((blog) => blog.id === blogId);
    const users = await getUsers();
    const user = users.find(user => user.id === blog.userId);
    console.log(user)
    // return {
    //     title: `${user.name}'s blog`
    // }
}

export default function layout({ children }) {
  return children
}
