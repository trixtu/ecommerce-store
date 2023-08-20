import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className='font-roboto'>
        <h1 className=' pl-1 pr-0.5 py-1 bg-red-500 text-white font-bold text-lg capitalize'>Kontakt</h1>
        <div className='border p-4 text-left text-sm'>
            <p>Telefon-Hotline: 04101 835 510</p>
            <p className=' font-light'>Montag bis Freitag: 8.00–17.00 Uhr</p>
            <p className='font-light'>info@trixtu.de</p>
            <p className='flex items-center mt-1'>
               
                <ChevronRight size={10}/>
                <Link href={'/'}>Kontaktformular</Link>
                
            </p>
        </div>
    </div>
  )
}

export default Contact