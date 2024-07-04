'use client'
import AuthContext, { AuthProvider } from "./../../context/AuthProvider";
import CreateForm from "./../ui/create-form";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from './../ui/dashboard';

export default function DashboardPage() {
  // check auth
  const { Auth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (Auth?.user) {
      router.push('dashboard')
    } else if (!Auth?.user) {
      router.push('dashboard/signup')
    }
  }, [Auth, router])
  
  return (
    Auth.user ? <Dashboard Authuser={Auth.user}/> : <div>Dashboard Page</div>
  )
}

