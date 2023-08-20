"use client"
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/types'
import IconButton from '@/components/ui/icon-button'
import Currency from '@/components/ui/currency'
import useCart from '@/hooks/use-cart'
import { useCartStore } from '@/hooks/use-cart-store'
import { TableCell, TableRow } from '@/components/ui/table'
import { Trash2 } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button'



interface CartItemProps {
    data: Product
}


const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addItemToCart = useCartStore(state => state.addToCart)
    const removeItemToCart = useCartStore(state => state.removeItemFromCart)

    const cart = useCartStore()


    return (
        <TableRow className='grid grid-cols-12 text-base'>
            <TableCell 
                className='border col-span-1 flex flex-col items-center text-center justify-center cursor-pointer '
                onClick={()=>removeFromCart(data)}
            >

                <Trash2 size={20} className='text-red-600' />
                <span className=' text-center'> Artikel entfernen</span>

            </TableCell>
            <TableCell className='flex col-span-2 items-center justify-center border' colSpan={1}>
                <div className='relative w-28 h-28 overflow-hidden '>
                    <Image
                        fill
                        sizes='100%'
                        src={data.images[0].url}
                        alt=''
                        className=' object-contain object-center'
                        priority
                    />
                </div>
            </TableCell>
            <TableCell className='relative flex flex-col justify-center items-center text-center col-span-3 border'>
                <strong>{data.name}</strong>
                <div className='mt-1 flex justify-center items-center text-sm'>
                    <p className='text-gray-500'>{data.color.name}</p>
                    <p className='text-gray-500 ml-4 border-l pl-4'>{data.size.name}</p>
                </div>
                <div>
                    <p className='text-gray-500'>Lieferzeit:ca. 10 - 15 Werktage</p>
                </div>
            </TableCell>
            <TableCell className='flex flex-col items-center justify-center col-span-2 border'>
                <Currency value={data.price} />
            </TableCell>
            <TableCell className='flex flex-col items-center justify-center col-span-2 border'>
                <div className='flex items-center justify-center'>
                    <Button 
                        className=" rounded-none inline-block bg-neutral-400 p-1 hover:bg-neutral-500"
                        onClick={() => removeItemToCart(data)}
                    >
                        <Minus className='w-6 h-6' />
                    </Button>
                    <div className='flex items-center justify-center border  rounded-none h-8 mx-1 w-14 text-center border-neutral-400'>
                        {data.quantity}
                    </div>
                    <Button 
                        className=" rounded-none inline-block bg-neutral-400 p-1 hover:bg-neutral-500"
                        onClick={() => addItemToCart(data)}
                    >
                        <Plus className='w-6 h-6'/>
                    </Button>
                </div>
            </TableCell>
            <TableCell className=' col-span-2 flex flex-col items-center justify-center border'>
                <Currency value={data.price*data.quantity} />
            </TableCell>
        </TableRow>


    )
}

export default CartItem


{/* <div className='relative h-24 w-24 rounded-md overflow-hidden '>
            <Image 
                fill
                sizes='100%'
                src={data.images[0].url}
                alt=''
                className=' object-cover object-center'
                priority
            />
        </div>
        <div className='relative ml-4 flex flex-1 flex-col justify-between'>
            <div className='absolute z-10 right-0 top-0'>
                <IconButton onClick={() => removeFromCart(data)} icon={<X size={15}/>} className='bg-red-500 text-white'/>
            </div>
            <div className='relative pr-9  sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold text-black'>
                        {data.name}
                    </p>
                </div>
                <div>
                    <Button>-</Button>
                    {data.quantity}
                    <Button>+</Button>
                </div>
                
               
                <Currency value={data.price}/>
            </div>

            <div className='mt-1 flex text-sm'>
                    <p className='text-gray-500'>{data.color.name}</p>
                    <p className='text-gray-500 ml-4 border-l pl-4'>{data.size.name}</p>
                </div>
        </div> */}