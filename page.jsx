
import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import { useGetAllBlogsQuery } from "../lib/features/blog/blogSlice";

export const metadata = {
  title: 'Home'
}

export default function Home() {
  // const {
  //   data,
  //   isSuccess,
  //   isLoading,
  //   isError,
  //   error
  // } = useGetAllBlogsQuery();
  return (
      
      <main>
        Home Page
      </main>
    
  );
}
