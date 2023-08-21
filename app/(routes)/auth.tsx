"use client"

import Button from "@/components/ui/Button"
import { signIn, signOut} from "next-auth/react"

export const LoginButton = ()=>{
    return <button onClick={()=>signIn()}>Sign In</button>
}

export const LogoutButton = ()=>{
    return <Button className="bg-red-600 rounded-none py-1 shadow-sm" onClick={()=>signOut()}>Abmelden</Button>
}