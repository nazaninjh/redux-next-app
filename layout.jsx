'use client'
import Link from "next/link";
import style from "./page.module.css"
import './globals.css'
import StoreProvider from "./storeProvider";
import { AuthProvider } from "./../context/AuthProvider";
import { useState } from "react";



export default function RootLayout({ children }) {
  const [hover, setHover] = useState(false);
  const [miniNavHover, setMiniNavHover] = useState(false);
  const showBlogNav = () => {
    // add a transition to make this smooth
    setHover(true)
  }
  const hideBlogNav = () => {
    if (!miniNavHover) {
      setTimeout(() => {
        setHover(false)
      }, 2000);
    }
  }
  const showHideMiniBlogNav = () => {
    setMiniNavHover(!miniNavHover)
  }
 
  return (
    <html lang="en">
      <body className= {style.main}>
            <StoreProvider>
            <nav className='global-navbar'>
              <Link href='/'>Home</Link>
              <Link href='/dashboard'>Dashboard</Link>
              
              <Link href='/blog'
              onMouseEnter={showBlogNav}
              onMouseLeave={hideBlogNav}>
              Blog
              </Link>
              <Link href='/users'>Users</Link>
              {hover && <nav className={style.localBlogNav}
                onMouseEnter={showHideMiniBlogNav}
                onMouseLeave={showHideMiniBlogNav}>
                <Link href='/blog/create'>Create Blog</Link>
              </nav>}
            </nav>
            
              <AuthProvider>
                {children}
              </AuthProvider>
            </StoreProvider>
      </body>
    </html>
  );
}
