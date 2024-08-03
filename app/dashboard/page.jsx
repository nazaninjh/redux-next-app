'use client'
import AuthContext from "./../../context/AuthProvider";
import CreateForm from "./../ui/create-form";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from './../ui/dashboard';

export default function DashboardPage() {
  // check auth
  const { Auth } = useContext(AuthContext);
  const router = useRouter();
  const store = window.localStorage;
  const storeExists = store.getItem('user');
  const storeUser = 
  console.log(storeExists);
  useEffect(() => {
    if (Auth?.user || store.user) {
      router.push('dashboard')
    } else if (!Auth?.user) {
      router.push('dashboard/signup')
    }
  }, [Auth, router])
  
  return (
    (Auth.user || store.user) ? <Dashboard Authuser={store.user || Auth.user}/> : <p></p>
  )
}

