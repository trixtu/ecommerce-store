"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/error-message'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z
  .object({
    vorname: z.string().nonempty("Vorname is required"),
    nachname: z.string().nonempty("Nachname is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Email format not valid"),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

interface EditAccountProps {
  data: {
    id: any
    email: any
    vorname: any
    nachname: any
  }
}

interface FormValues {
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const EditAccount: React.FC<EditAccountProps> = ({ data }) => {

  const route = useRouter()
  const [vorname, setVorname] = useState(data.vorname)
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(formSchema),
  });
  
  const { formState, register, handleSubmit, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/register/edit", {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            anrede: data.anrede,
            vorname: data.vorname,
            nachname: data.nachname,
            //email: data.email,
            //password: data.password,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      route.push('/')

    } catch (error: any) {
      setError(error?.message);
    }
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-neutral-300" />
      <div className="lg:grid lg:grid-cols-2">
        <div className='my-2'>
          <h2 className="font-bold text-xl mb-2">Kontoinformationen</h2>
          <div className="grid w-full items-center gap-1.5 mb-2">
            <Label htmlFor="vorname">
              Vorname <span className="ml-1">*</span>
            </Label>
            <Input
              className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
              {...register("vorname")}
              id="vorname"
              type="text"
            />
            <span className="text-sm text-red-500">
              {errors.vorname?.message}
            </span>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nachname">
              Nachname <span className="ml-1">*</span>
            </Label>
            <Input
              className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
              {...register("nachname")}
              id="nachname"
              type="text"
            />
            <span className="text-sm text-red-500">
              {errors.nachname?.message}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <Button
          className=" rounded-sm flex items-center justify-center bg-neutral-800 mt-4 py-2"
          onClick={() => route.push("/")}
        >
          <ChevronLeft size={20} />
          Zurück
        </Button>
        <Button className=" rounded-sm flex items-center justify-center bg-red-600 mt-4 py-2" type='submit'>
          Speichern
          <ChevronRight size={20} />
        </Button>
      </div>
    </form>
  )
}

export default EditAccount