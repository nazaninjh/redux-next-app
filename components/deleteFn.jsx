'use client'

import { useEffect, useState } from "react";
import { useDeleteBlogMutation } from "../lib/features/blog/blogSlice";
import { useRouter } from "next/navigation";
import { useDeleteUserMutation } from "../lib/features/users/usersSlice";

export default function DeleteFn({ id, type }) {
  const [ confirmed, setConfirmed ] = useState(null);
  const [ deleteBlog, {isLoading} ] = useDeleteBlogMutation();
  const [ deleteUser ] = useDeleteUserMutation();
  const router = useRouter();
  
  useEffect(() => {
    const blogConfirmed = confirm('Are you sure you want to delete?');
    if (!blogConfirmed) {
      setConfirmed(false);
    } else if (blogConfirmed) {
      setConfirmed(true);
    }
    
    
  }, [confirmed])
  useEffect(() => {
    if (confirmed) {
      handleDel();
    } else if (confirmed === false && !isLoading) {
      if (type === 'blog') {
        router.push('/blog');
      } else if (type === 'user') {
        router.push('/dashboard');
      }
      
    }
  }, [confirmed])
  const handleDel = async () => {
    try {
      
      if (type === 'blog') {
        await deleteBlog(id);
        router.push('/blog');
      } else if (type === 'user') {
        await deleteUser(id);
        router.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return <p>Please wait...</p>
  }
 
  
}
