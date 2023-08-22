"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/error-message'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { User } from '@/types'
import { compare } from 'bcrypt'

const URL=`${process.env.NEXT_PUBLIC_API_URL}/users`

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
    id: any;
    initialData: User[]
}



const EditAccount: React.FC<EditAccountProps> = ({
    id,
    initialData
}) => {
    const router = useRouter()
    const user = initialData.find(user => user.id === id)
    const [loading, setLoading] = useState(false);
    const action = user ? "Speichern" : "Create";


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
            await axios.patch(
                `${URL}/${id}`,
                data
            );
            console.log("ok")
            
            router.refresh();
            //router.push(`/${params.storeId}/subcategories`);
            //toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    console.log(loading)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="border-b border-neutral-300" />
                <h2 className="font-bold text-xl mb-2">Kontoinformationen</h2>
                <div className="lg:grid lg:grid-cols-2 gap-x-4">
                    <div className='my-2'>
                        <FormField
                            control={form.control}
                            name='vorname'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vorname *</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Vorname'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='nachname'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nachname *</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Nachname'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Email'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='my-2'>

                        

            

                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <Button
                        className=" rounded-sm flex items-center justify-center bg-neutral-800 mt-4 py-2"
                        onClick={() => router.push("/")}
                    >
                        <ChevronLeft size={20} />
                        Zurück
                    </Button>
                    <Button
                        className=" rounded-sm flex items-center justify-center bg-red-600 mt-4 py-2"
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