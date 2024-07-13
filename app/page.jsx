
import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import SearchByTitle from './../components/searchByTitle';
import BlogsByTopic from './../components/blogsByTopic';
export const metadata = {
  title: 'Home'
}

export default function Home() {
  return (
      
      <main className={styles.main}>
        <section className="top-section">
          <p>Blogs</p>
          <p>
            In this website you can post your own Blogs,
            review, edit and delete them as you wish
          </p>
          <p>You can also read the blogs of other users and enjoy.</p>
        </section>
        <section className="home-search-section">
          <p>Looking for something specific?</p>
          <SearchByTitle />
        </section >
        <section className="home-blogs-section">
          <p>Blogs by Topic</p>
          <div className="home-blogs-cont">
            <BlogsByTopic />
          </div>
        </section>
      </main>
    
  );
}
