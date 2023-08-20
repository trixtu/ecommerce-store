import { z } from 'zod'

export const userInfoSchema = z.object({
    vorname:z.string().min(1, {message:"Vorname is required."}).max(100),
    nachname:z.string().min(1, {message:"Nachname is required."}).max(100),
    email:z.string().email({message:"An email is required"})
   
})