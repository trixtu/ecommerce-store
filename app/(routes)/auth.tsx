"use client"

import Button from "@/components/ui/Button"
import { signIn, signOut} from "next-auth/react"

export const LoginButton = ()=>{
    return <button onClick={()=>signIn()}>Sign In</button>
}

export const LogoutButton = ()=>{
    return <Button onClick={()=>signOut()}>Sign out</Button>
}