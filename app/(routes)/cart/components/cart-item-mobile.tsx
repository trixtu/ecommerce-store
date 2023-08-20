import Button from '@/components/ui/Button'
import Currency from '@/components/ui/currency'
import { useCartStore } from '@/hooks/use-cart-store'
import { Product } from '@/types'
import { Minus, Plus, Trash2 } from 'lucide-react'

import Image from 'next/image'
import React from 'react'

interface CartItemMobileProps {
  data: Product
}

const CartItemMobile: React.FC<CartItemMobileProps> = ({
  data
}) => {
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const addItemToCart = useCartStore(state => state.addToCart)
  const removeItemToCart = useCartStore(state => state.removeItemFromCart)
  const cart = useCartStore((state) => state.cart)

  const total = cart.reduce((acc, product) => acc + product.price * (product.quantity as number), 0)

  return (
    <div className='border mb-4 font-roboto'>
      <h1 className='bg-neutral-200 text-center p-1 text-lg font-normal '>{data.name}</h1>
      <div className='grid grid-cols-2 p-3'>
        <div className='relative w-32 h-32 overflow-hidden '>
          <Image
            fill
            sizes='100%'
            src={data.images[0].url}
            alt=''
            className=' object-contain object-center'
            priority
          />
        </div>
        <div className='text-gray-500 text-center'>
          <h1>Warenkorb-Info</h1>
          <div className='mt-1 flex justify-center items-center text-sm'>
            <p >{data.color.name}</p>
            <p className='ml-4 border-l pl-4'>{data.size.name}</p>
          </div>
          <div>
            <p>Lieferzeit:ca. 10 - 15 Werktage</p>
          </div>
          <div className=' text-right mt-2 text-black'>
            <Currency value={data.price} />
          </div>
        </div>
      </div>
      <div className='border-t flex justify-between p-2'>
        <div onClick={()=>removeFromCart(data)} className='text-red-600'><Trash2 size={30}/></div>
        <div className='flex items-center justify-center'>
          <Button onClick={() => removeItemToCart(data)} className=' rounded-none p-1 bg-neutral-400'><Minus/></Button>
          <div className='border px-4 py-1'>{data.quantity}</div>
          <Button onClick={() => addItemToCart(data)} className=' rounded-none p-1 bg-neutral-400'><Plus/></Button>
        </div>
        <div className='text-xl'>
          <Currency value={total} />
        </div>
      </div>
    </div>
  )
}

export default CartItemMobile