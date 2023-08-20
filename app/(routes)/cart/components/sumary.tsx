"use client"
import Button from '@/components/ui/Button'
import Currency from '@/components/ui/currency'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCart from '@/hooks/use-cart'
import { useCartStore } from '@/hooks/use-cart-store'
import axios from 'axios'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast/headless'

const Sumary = () => {
    const searchParams = useSearchParams()
    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)

    const cart = useCartStore((state) => state.cart)
    const itemsCount = useCartStore((state) => state.totalItems)


    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Payment completed.")
            removeAll()
        }
        if (searchParams.get("canceled")) {
            toast.error("Something went wrong.")
        }
    }, [searchParams, removeAll])

    const total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)


    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: cart.map((item) => item.id)
        })

        window.location = response.data.url
    }

    const versand = 18 * itemsCount
    const bestellsumme = versand+total
    const MwSt = bestellsumme*19/100

    return (
        <div className='grid lg:grid-cols-12'>
            <div className='lg:col-span-6'></div>
            <div className='mt-16  bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-6 lg:mt-0 lg:p-8 border'>
                <h2 className='flex items-center justify-center font-semibold text-lg text-gray-900 bg-neutral-200 p-1'>Zusammenfassung</h2>
                <div className='mt-2'>
                    <h2 className='font-semibold text-lg'>Lieferung nach:</h2>
                    <Select>
                        <SelectTrigger className="w-full bg-white rounded-none">
                            <SelectValue  placeholder="Deutchland" defaultValue={"deutchland"}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="deutchland" >Deutchland</SelectItem>
                            <SelectItem value="frankreich">Frankreich</SelectItem>
                            <SelectItem value="italien">Italien</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='flex items-center justify-between mt-2'>
                        <h3 className='font-semibold'>Zwischensumme</h3>
                        <span><Currency value={total} /></span>
                    </div>
                    <div className='flex items-center justify-between mt-1'>
                        <h3 className='font-semibold'>Versandkosten</h3>
                        <span><Currency value={versand} /></span>
                    </div>
                    
                </div>
                <div className='mt-6 space-y-4'>
                    <div className='flex items-center justify-between border-t border-gray-200 pt-4 text-red-600 text-xl font-bold'>
                        <div className='text-xl font-bold'>Bestellsumme</div>
                        <Currency  value={bestellsumme} />
                    </div>
                    <div className='flex items-center justify-between font-normal'>
                        <h3>Inkl. MwSt.</h3>
                        <Currency  value={MwSt} />
                    </div>
                </div>
                <Button onClick={onCheckout} className='flex items-center justify-center w-full mt-6 bg-red-600 rounded-none text-lg py-2'>
                    Zur Kasse gehen
                    <ChevronRight size={20}/>
                </Button>
            </div>
        </div>
    )
}

export default Sumary