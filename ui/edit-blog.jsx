'use client'

import { useReducer, useState, useEffect, useLayoutEffect } from "react";
import { selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice";
import { useSelector } from "react-redux";
import style from './../page.module.css'
import { selectAllBlogs, useAddBlogMutation, useEditBlogMutation, useGetAllBlogsQuery } from "./../../lib/features/blog/blogSlice";
import { useRouter } from "next/navigation";

const TITLE_REG = /^[a-zA-Z0-9_].{4,20}$/;
const CONTENT_REG = /^[a-zA-Z0-9_].{10,150}$/;

export default function EditBlog({ blogId }) {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState(null);
  const [isOk, setIsOk] = useState(false);
  const [status, setStatus] = useState('idle');
  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading
  } = useGetAllBlogsQuery();
  const blogs = useSelector(state => selectAllBlogs(state));
  const users = useSelector(state => selectAllUsers(state));
  const toEditBlog = blogs.find(blog => blog.id === blogId);
  const [ editBlogFn ] = useEditBlogMutation();
  const fieldAction = (clientState, action) => {
    switch (action.type) {
        case 'author':
            return {
                ...clientState,
                [action.type]: action.payload
            }
        case 'title':
            return {
                ...clientState,
                [action.type]: action.payload
            }
        
        
        case 'blogContent':
            return {
                ...clientState,
                [action.type]: action.payload
            }
        case 'title-valid':
          return {
              ...clientState,
              titleValid: action.payload
          }
        case 'blogContent-valid':
          return {
              ...clientState,
              blogContentValid: action.payload
          }
        case 'empty-values': 
        return {
            ...clientState,
            title: '',
            blogContent: '', 
        }
            default: 
            return {
              author: 0,
              title: '',
              titleValid: false,
              blogContent: '',
              blogContentValid: false
            }

    }          
  };

  const [fieldState, fieldDispatch] = useReducer(fieldAction, {
    author: 0,
    title: toEditBlog ? toEditBlog.title : '',
    titleValid: false,
    blogContent: toEditBlog ? toEditBlog.content : '',
    blogContentValid: false
  });
  const canSave = status === 'idle' && fieldState.author !== 0 &&
  fieldState.titleValid && fieldState.blogContentValid

  const setValues = (e, type) => {
    fieldDispatch({
      type,
      payload: e.target.value
    })
  };
  useEffect(() => {
    fieldDispatch({
        type: 'title-valid',
        payload: TITLE_REG.test(fieldState.title)
    })
  }, [fieldState.title])
  useEffect(() => {
    fieldDispatch({
        type: 'blogContent-valid',
        payload: CONTENT_REG.test(fieldState.blogContent)
    })
  }, [fieldState.blogContent]);

  // add validation for blog
  // no repetitions
   const blogValidation = async () => {
    await data;
    setIsOk(false);
    setErrMsg(null);
 
    blogs.map(blog => {
      if (blog.title === fieldState.title && blog.content === fieldState.blogContent
      ) {
          setErrMsg('Blog Already Posted!');
          setIsOk(false);
      } else if (blog.title !== fieldState.title && blog.content !== fieldState.blogContent) {
        setIsOk(true);
        setErrMsg(null);
      }
    })
   };
  
  const handleSubmit = async (e) => {
    // fix here
    //error msg sets to null too soon
    e.preventDefault();
    
    await blogValidation();
    let date = new Date().toISOString();
      try {
        if (!errMsg && status === 'idle' && isOk) {
          setStatus('pending');
          await data;
          await editBlogFn({
            id: toEditBlog.id,
            userId: fieldState.author,
            title: fieldState.title,
            content: fieldState.blogContent,
            date,
          }).unwrap();
        }   
      } catch (err) {
        console.log(err)
      }
    if (!errMsg && isOk) {
      fieldDispatch({
        type: 'empty-values'
      }); 
      setStatus('idle');
      router.push('/blog')
    }
    
    
  };
  let content;
  let usersList;
  if (isSuccess) {
    const edittingUser = users.find(user => {
      return user.userId === toEditBlog.userId 
    })
    usersList = 
    (edittingUser ? <option value={edittingUser.id}>{edittingUser.name}</option> :
    users.map(user => {
        return (
            <option key={user.id} value={user.id}>{user.name}</option>
        )
    }))
    
  } else if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>{error}</p>
  }
  return (
    // what is the problem?
    (isLoading || isError) ? content :
    <section>
        <p>
            {errMsg}
        </p>
    
      <form className={style.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Write your blog</legend>
          <select defaultValue='0' value={fieldState.author}
          name="author"
          onChange={e => setValues(e, e.target.name)}>
              <option value='0'>Choose Author</option>
              {usersList}
          </select>
          <label htmlFor="title">Blog title: </label>
          <input type="text" id="title"
          value={fieldState.title}
          name="title"
          onChange={e => setValues(e, e.target.name)}/>
          <label htmlFor="content">Blog content: </label>
          <textarea cols='20' rows='2' 
          placeholder="This blog is about..."
          value={fieldState.blogContent}
          name="blogContent"
          onChange={e => setValues(e, e.target.name)} />
        </fieldset>
        <button 
        className={style.submitBtn}
        disabled={!canSave}>
          Edit Blog
          </button>
      
    </form>
    </section>
    
  )
   
}
