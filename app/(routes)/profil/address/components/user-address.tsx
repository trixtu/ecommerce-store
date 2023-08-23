"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import * as z from "zod"
import { Address, User } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'


const URL = `${process.env.NEXT_PUBLIC_API_URL}/address`

const formSchema = z
    .object({
        firma: z.string(),
        telefon: z.string().nonempty("Dies ist ein Pflichtfeld."),
        street: z.string().nonempty("Dies ist ein Pflichtfeld."),
        stadt: z.string().nonempty("Dies ist ein Pflichtfeld."),
        postzahl: z.string().nonempty("Dies ist ein Pflichtfeld."),
        land: z.string().nonempty("Dies ist ein Pflichtfeld."),
    })

type UserAddressFormValues = z.infer<typeof formSchema>

interface UserAddressProps {
    address: Address[]
    users: User[]
    emailSession: any
}

const UserAddress: React.FC<UserAddressProps> = ({
    address,
    users,
    emailSession
}) => {

    const router = useRouter()
    const user = users.find(user => user.email === emailSession)
    const userAddress = address.find(address => address.userId === user?.id)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const action = userAddress ? "Speichern" : "Create";

    const form = useForm<UserAddressFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: userAddress || {
            firma: "",
            telefon: "",
            street: "",
            stadt: "",
            postzahl: "",
            land: "",
        }
    })

    const { formState } = form;
    const { errors } = formState;

    const onSubmit = async (data: UserAddressFormValues) => {
        try {
            setLoading(true)
            if (userAddress) {
                const res = await fetch(URL, {
                    method: "PATCH",
                    body: JSON.stringify({
                        data: {
                            id: userAddress.id,
                            firma: data.firma,
                            telefon: data.telefon,
                            street: data.street,
                            stadt: data.stadt,
                            postzahl: data.postzahl,
                            land: data.land
                        }
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (res.ok) {
                    router.refresh();
                    toast.success("Erfolgreich aktualisiert");
                    router.push('/profil')
                } else {
                    setError((await res.json()).error)
                }

            } else {
                const res = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify({
                        data: {
                            userId: user?.id,
                            firma: data.firma,
                            telefon: data.telefon,
                            street: data.street,
                            stadt: data.stadt,
                            postzahl: data.postzahl,
                            land: data.land
                        }
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (res.ok) {
                    router.refresh();
                    toast.success("Erfolgreich aktualisiert");
                    router.push('/profil')
                } else {
                    setError((await res.json()).error);
                }
            }

        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false)
        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="border-b border-neutral-300" />

                <div className="lg:grid lg:grid-cols-2 gap-x-4">

                    <div className='my-2'>
                        <h2 className="font-bold text-xl my-2">Kontoinformationen</h2>

                        <div className='mb-4'>
                            <label htmlFor="vorname">Vorname</label>
                            <Input
                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                disabled
                                value={user?.vorname}
                                id='vorname'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor="nachname">Nachname</label>
                            <Input
                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                disabled
                                value={user?.nachname}
                                id='nachname'
                            />
                        </div>

                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='firma'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Firma</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
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
                                name='telefon'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefonnummer *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span className="text-sm text-red-500">
                                {errors.telefon?.message}
                            </span>
                        </div>

                    </div>

                    <div className='my-2'>
                        <h2 className="font-bold text-xl my-2">Addresse</h2>

                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='street'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adresse *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span className="text-sm text-red-500">
                                {errors.street?.message}
                            </span>
                        </div>


                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='stadt'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stadt *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span className="text-sm text-red-500">
                                {errors.stadt?.message}
                            </span>
                        </div>


                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='postzahl'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postleitzah *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span className="text-sm text-red-500">
                                {errors.postzahl?.message}
                            </span>
                        </div>


                        <div className='mb-4'>
                            <FormField
                                control={form.control}
                                name='land'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Land *</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='border-neutral-400 rounded-none h-7 w-[300px]'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <span className="text-sm text-red-500">
                                {errors.land?.message}
                            </span>
                        </div>
                        
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

export default UserAddress