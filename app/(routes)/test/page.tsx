"use client"
import ProductList from '@/components/products-list'
import { useProductsStore } from '@/components/test'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'



const Test = () => {
   
    const params = useParams()

    console.log(params)
    const { products, isLoading, error, fetchData } = useProductsStore()

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div>
            {isLoading
                ? <div className='text-center text-lg'>Loading...</div>
                : <ProductList items={products} title='Test Products'/>
            }
        </div>
    )
}

export default Test