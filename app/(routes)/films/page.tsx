"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
const Films = () => {

   

    // const [data, setData] = useState<any>(null)
    // useEffect(() => {
    //     const fetcData = async () => {
    //         const data = await axios.get('http://localhost:1337/api/courses?populate=*')
    //         const response = data.data.data
    //         setData(response)
    //     }
    //     fetcData()

    // }, [])

    // console.log(data)

    return (
        <div>
            {data?.map((item: any, index: number) => {
                return (

                    <p key={item.id}>{item.attributes.title}</p>

                )
            })}
        </div>

    )
}

export default Films