"use client"

import { Product } from "@/types"
import Image from "next/image"
import React, { MouseEventHandler } from "react"
import { useRouter } from "next/navigation"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"



interface SubcategoryCardProps{
    data:Product
}
const SubcategoryCard:React.FC<SubcategoryCardProps>= ({
    data
}) => {
    const previewModal = usePreviewModal()
    const router = useRouter()

    const handleClick =() =>{
        router.push(`/subcategories/${data?.id}`)
    }

    const onPreview:MouseEventHandler<HTMLButtonElement> =(event) =>{
        event.stopPropagation()

        previewModal.onOpen(data)
    }
  return (
    <div onClick={handleClick} className="bg-[#ececec] group cursor-pointer border  hover:shadow-[0px_0px_10px_0px_#333]">
        {/* Images and Actions */}
        <div className=" aspect-video bg-gray-100 relative ">
            <Image
                src={data?.images?.[0]?.url}
                fill
                alt="Image"
                className=" aspect-square object-cover"
            />
        </div> 
        {/* Description */}
        <div className="px-2 py-1 bg-[#ececec] text-stone-800">
            <p className=" capitalize font-bold text-lg font-roboto">
                {data.name}
                
            </p>
            
           
        </div>
        
    </div>
  )
}

export default ProductCard