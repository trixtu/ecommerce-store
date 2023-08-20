"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"

const fetchPosts = async (url: string) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch')
    }

    return response.json()
}

const SearchPage =  () => {
    const search = useSearchParams()
    const searchQuery = search ? search.get('q') : null
    const encodeSearchQuery = encodeURI(searchQuery || '')

   
   
       
    return (

        <div></div>

    )
}

export default SearchPage