import getProducts from '@/actions/get-products'
import { Product } from '@/types'
import React from 'react'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import CategoryCard from './ui/category-card';

interface ProductListProps {
    ids: string,
    idCategory: string
    categoryName: string
}
const ProductList: React.FC<ProductListProps> = async ({
    ids,
    idCategory,
    categoryName
}) => {

    const products = await getProducts({
        categoryId: ids,
    })


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4'>
            <Link href={`/category/${idCategory}/${ids}`} className="bg-[#ececec] group cursor-pointer border  hover:shadow-[0px_0px_10px_0px_#333] hover:bg-red-500 hover:text-white">
                <div className='flex flex-col items-center justify-center text-center h-full text-3xl'>
                    <p>Zum gesamten</p>
                    <p className='flex items-center'>Sortiment <ChevronRight size={35} /></p>
                </div>
            </Link>
            {products.map((item) => (
                <CategoryCard key={item.id} data={item} />
            ))}
        </div>
    )
}

export default ProductList