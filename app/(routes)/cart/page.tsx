"use client"
import Container from "@/components/ui/container"
import React, { useEffect, useState } from 'react'
import CartItem from "./components/cart-item"
import Sumary from "./components/sumary"

import { useCartStore } from "@/hooks/use-cart-store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CartItemMobile from "./components/cart-item-mobile"



const CartPage = () => {

    const cart = useCartStore(state => state.cart)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <div className='bg-white font-roboto'>
            <Container>
                <div className="px-4 py-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Warenkorb ({cart.length} Artikel)</h1>
                    <div /*className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12"*/ >
                        <div className="mt-4">
                            <Table className="hidden lg:grid" >
                                <TableHeader className=" bg-neutral-200 text-base">
                                    <TableRow className='lg:grid lg:grid-cols-6'>
                                        <TableHead className=' col-span-3 text-black flex items-center font-semibold justify-center border border-white'><span>Produkt</span></TableHead>
                                        <TableHead className="col-span-1 text-black flex items-center font-semibold justify-center border border-white"><span>Einzelpreis</span></TableHead>
                                        <TableHead className="col-span-1 text-black flex items-center font-semibold justify-center border border-white"><span>Menge</span></TableHead>
                                        <TableHead className="col-span-1 text-black flex items-center font-semibold justify-center border border-white"><span>Zwischensumme</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.length > 0
                                        ? cart.map(product => (
                                            <CartItem key={product.id} data={product} />

                                        ))
                                        : <TableRow className="grid grid-cols-1">
                                            <TableCell className="flex items-center justify-center text-lg border p-4">
                                                <p>Sie haben keine Artikel im Warenkorb</p>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>

                            {/* mobile */}
                            <div className="lg:hidden">
                                {cart.length > 0 
                                    ? cart.map(product => (
                                        <CartItemMobile key={product.id} data={product}/>
                                    ))
                                    : <p>Sie haben keine Artikel im Warenkorb</p>

                                }
                            </div>
                        </div>
                        <Sumary/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartPage