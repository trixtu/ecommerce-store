"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast";
import { User } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

const formSchema = z
    .object({
        vorname: z.string().nonempty("Vorname is required"),
        nachname: z.string().nonempty("Nachname is required"),
        email: z
            .string()
            .nonempty("Email is required")
            .email("Email format not valid"),
    })
// .refine((data) => data.password === data.passwordConfirm, {
//     message: "Passwords don't match",
//     path: ["confirm"],
// });

type AccountFormValues = z.infer<typeof formSchema>;

interface EditAccountProps {
    idUser: any;
    initialData: User[]
}



const EditAccount: React.FC<EditAccountProps> = ({
    idUser,
    initialData
}) => {
    const router = useRouter()
    const user = initialData.find(user => user.id === idUser)
    const [loading, setLoading] = useState(false);

    
    const action = user ? "Speichern" : "Create";

    const [error, setError] = useState<string | null>(null);


    const form = useForm<AccountFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: user || {
            vorname: "",
            nachname: "",
            email: "",
        },
    });



    const onSubmit = async (data: AccountFormValues) => {

        try {
            setLoading(true);
            const res = await fetch(`${URL}`, {
                method: "PATCH",
                body: JSON.stringify({
                    data: {
                        userId: idUser,
                        vorname: data.vorname,
                        nachname: data.nachname,
                        email: data.email,
                    },
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res.ok) {
                router.refresh();
                toast.success("Erfolgreich aktualisiert");
                router.push('/profil')
            } else {
                setError((await res.json()).error);
            }

            //router.push(`/${params.storeId}/subcategories`);

        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="border-b border-neutral-300" />
                <h2 className="font-bold text-xl my-2">Kontoinformationen</h2>
                <div className="lg:grid lg:grid-cols-2 gap-x-4">
                    <div className='my-2'>
                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='vorname'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vorname *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                placeholder='Vorname'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='nachname'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nachname *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                placeholder='Nachname'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                placeholder='Email'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='my-2'>





                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <Button
                        className=" rounded-none flex items-center justify-center bg-neutral-800 mt-4 py-1"
                        onClick={() => router.push("/profil")}
                    >
                        <ChevronLeft size={20} />
                        Zurück
                    </Button>
                    <Button
                        className=" rounded-none flex items-center justify-center bg-red-600 mt-4 py-1"
                        type='submit'
                        disabled={loading}
                    >
                        {action}
                        <ChevronRight size={20} />
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditAccount