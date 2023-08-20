"use client"

import { Product } from "@/types"
import Image from "next/image"
import React, { MouseEventHandler } from "react"
import IconButton from "@/components/ui/icon-button"
import { Expand, ShoppingCart } from "lucide-react"
import Currency from "@/components/ui/currency"
import { useRouter } from "next/navigation"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"
import { ChevronRight } from 'lucide-react';


interface CategoryCardProps {
    data: Product
}
const CategoryCard: React.FC<CategoryCardProps> = ({
    data
}) => {
    const previewModal = usePreviewModal()
    const router = useRouter()
    const cart = useCart()

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()

        previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()

        cart.addItem(data)
    }
    return (
        <div onClick={handleClick} className="group cursor-pointer border  hover:shadow-[0px_0px_10px_0px_#333]">
            {/* Images and Actions */}
            <div className=" aspect-video bg-gray-100 relative ">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    sizes="100%"
                    alt="Image"
                    className=" aspect-square object-cover"
                />
                {/* <div className=" opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                <div className="flex gap-x-6 justify-center">
                    <IconButton
                        onClick={onPreview}
                        icon={<Expand size={20} className="text-gray-600"/>}
                    />
                    <IconButton
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20} className="text-gray-600"/>}
                    />
                </div>
            </div> */}
            </div>
            {/* Description */}
            <div className="px-2 py-1 bg-[#ececec] text-stone-800">
                <p className=" capitalize font-bold text-lg font-roboto">
                    {data.name}
                </p>
            </div>
            {/* <div className="flex flex-col ml-2 text-sm mt-1 font-light text-neutral-800">
                <span className="">{data.size?.value}</span>
                <span className="">{data.color?.name}</span>
            </div> */}

            {/* Price */}
            {/* <div className="flex items-center justify-end mr-2 text-2xl">
                <Currency value={data?.price} />
            </div> */}
        </div>
    )
}

export default CategoryCard