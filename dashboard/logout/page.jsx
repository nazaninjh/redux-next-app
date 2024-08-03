'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const store = window.localStorage;
  const confirmaion = confirm('Do you want to log out?');
  const router = useRouter();
  useEffect(() => {
    if (confirmaion) {
        store.removeItem('user');
        router.push('/');
    } else {
        router.push('/dashboard');
    } 
    
  }, [confirmaion])
}
