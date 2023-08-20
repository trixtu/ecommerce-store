"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import Button from '../ui/Button'
import { Search as SearchBtn, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [showDelete, setShowDelete] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const deleteInput = () => {
        setShowDelete(false)
        setSearchQuery('')


    }

    const valueChange = (e:any) => {
        e.preventDefault()
        setSearchQuery(e.target.value)
        setShowDelete(true)
    }

    
    const onSearch = (event:React.FormEvent) => {
        event.preventDefault()

        const encodeSearchQuery = encodeURI(searchQuery)
        router.push(`/search?q=${encodeSearchQuery}`)
        
    }
    return (

        <div className='hidden lg:flex items-center justify-center w-full mx-5'>
            <form className=' w-full' onSubmit={onSearch}>
                <Input onChange={valueChange} value={searchQuery} placeholder='Ihr Suchbegriff' className='w-full' />
                <div className='absolute z-50 top-[23px] right-[274px] flex items-center'>
                    <div onClick={deleteInput} className={showDelete ? ' text-red-600 border rounded-full border-red-600 p-[1px]' : 'hidden'}><X size={15} /></div>
                    <span className={showDelete ? ' px-2 w-2 py-1 text-neutral-400 font-extralight' : 'hidden'}>|</span>
                    <Button className=' bg-transparent text-red-600  p-1 '><SearchBtn /></Button>
                </div>
            </form>
        </div>

    )
}

export default Search