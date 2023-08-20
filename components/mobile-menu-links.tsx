'use client'

import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Category, Subcategory } from '@/types'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface MenuLinksProps {
    data: Category[]
    subcategories: Subcategory[]
    toggleMenu:()=>void
}

const MenuLinks: React.FC<MenuLinksProps> = ({
    data,
    subcategories,
    toggleMenu
}) => {

    const [loading, setLoading] = useState(false)

    return (
        <Accordion type="single" collapsible className="w-full">
            {data.length > 0 && data.map((cat) => (
                <AccordionItem value={cat.id} key={cat.id}>
                    <AccordionTrigger>{cat.name}</AccordionTrigger>
                    {subcategories.map((subcat) => (
                        subcat.categoryId === cat.id && (
                            <AccordionContent key={subcat.id}>
                                <div onClick={toggleMenu}>
                                    <Link className='flex items-center ml-2 cursor-pointer' href={`/category/${subcat.categoryId}/${subcat.id}`}>
                                        <ChevronRight size={18} />
                                        {subcat.name}
                                    </Link>
                                </div>
                            </AccordionContent>
                        )

                    ))}

                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default MenuLinks