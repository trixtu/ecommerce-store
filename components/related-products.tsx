import { Product } from '@/types'
import React from 'react'
import Noresults from './ui/no-result'
import ProductCard from './ui/product-card'

interface RelatedProductsProps {
    title: string
    items: Product[]
    idProduct: string
}
const RelatedProducts: React.FC<RelatedProductsProps> = ({
    title,
    items,
    idProduct
}) => {
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-xl text-center bg-neutral-800 p-1 text-white mt-12">{title}</h3>
            {items.length === 0 && <Noresults />}
            <div className="grid grid-cols-1">
                {items.map((item) => (
                    idProduct === item.id ? null :
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>

        </div>
    )
}

export default RelatedProducts