'use client'
import Link from "next/link";
import style from "./page.module.css"
import './globals.css';
import { AuthProvider } from "./../context/AuthProvider";
import { useState } from "react";
import StoreProvider from './StoreProvider'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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
              <div className="gp-one">
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
              </div>
              <div className="gp-two">
                <Link href='/dashboard/signin'>log in</Link>
                <div className="nav-signup-gp">
                  <Link href='/dashboard/signup'>sign up</Link>
                  <FontAwesomeIcon icon={faPen}
                  style={{fontSize: 'small'}} />
                </div>
              </div>
            </nav>
            
              <AuthProvider>
                {children}
              </AuthProvider>
            </StoreProvider>
      </body>
    </html>
  );
}
