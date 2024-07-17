'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectAllBlogs } from "../lib/features/blog/blogSlice";
import style from './../app/page.module.css';
import Link from "next/link";
export default function SearchByTitle() {
  // style it
  // make the button work
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState([]);
  const blogs = useSelector(state => selectAllBlogs(state));

  const handleChange = async (e) => {
    setSearchValue(e.target.value);
    let result;
    result = blogs.filter(blog => {
      let title = blog.title.toLowerCase();
      let value = searchValue.toLowerCase();
      return title.includes(value);
    })
    if (result && searchValue) {
      setResult(result);
    } else {
      return
    }
    
  }

  const resultBlogs = result.filter(res => {
    return blogs.filter(blog => {
      return blog.title === res
    })
  })
  const topFiveResults = resultBlogs.slice(0, 5);
  const handleSubmit = (e) => {
    let result;
    result = blogs.filter(blog => {
      let title = blog.title.toLowerCase();
      let value = searchValue.toLowerCase();
      return title === value;
    })
    if (result && searchValue) {
      setResult(result);
    } else {
      return
    }
  }
  return (
    <section className='searchPlusResultCont'>
      <div className="searchCont">
      <input type="search" id="search" placeholder="Type to search..."
      value={searchValue}
      onChange={(e) => handleChange(e)}/>
      <button onClick={() => handleSubmit()}>Search</button>
      </div>
      { searchValue && <section className={topFiveResults.length > 0 ?
        'searchResultCont' : 'searchResultCont hide'
      }>
        {topFiveResults.map(blog => {
          return <Link href={`/blog/${blog.id}`} key={blog.id}
            className='searchResult'>
            {blog.title}
          </Link >
        })}
      </section>}
      
    </section>
  )
}
