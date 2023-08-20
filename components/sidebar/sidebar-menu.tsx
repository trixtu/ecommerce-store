"use client"

import { cn } from '@/lib/utils'
import { Category, Subcategory } from '@/types'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react';
import qs from 'query-string'
import Button from '../ui/Button'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

interface SidebarMenuProps {
    category: Category,
    subcategories: Subcategory[]
    valueKey: string
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
    category,
    subcategories,
    valueKey
}) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        router.push(`/category/${category.id}/${id}`);
    };
    return (

        <div className='mt-4 font-roboto mb-5'>
            <h1 className=' pl-1 pr-0.5 py-1 bg-red-500 text-white font-bold text-lg capitalize'>{category?.name}</h1>
            <div className='pt-1'>
                <ul>
                    {subcategories.map((filter) => (
                        <li key={filter.id}>
                            <Button  
                                className={cn(
                                    "flex items-center rounded-none text-base text-gray-800 p-0 bg-white hover:opacity-100 hover:underline",
                                    selectedValue === filter.id && " text-red-500" 
                                )}
                                onClick={() => onClick(filter.id)}
                            >
                                <ChevronRight size={18}/>
                                {loading ? <p>Loading....</p> : filter.name}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu