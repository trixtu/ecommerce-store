"use client"

import React, { useState } from 'react'
import { Facebook, Instagram, List, X } from 'lucide-react'
import Link from 'next/link'
import IconButton from './ui/icon-button'
import MenuLinks from './mobile-menu-links'
import { Category, Subcategory } from '@/types'

interface MobileMenuProps {
    data:Category[]
    subcategories:Subcategory[]
}

const MobileMenu:React.FC<MobileMenuProps> = ({
    data,
    subcategories
}) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => setMenuOpen(!menuOpen)
    const style = {
        navLinks: ' ml-10 uppercase border-b  border-white  hover:border-[#F6B519] text-xl'
    }
    return (
        <>
            <IconButton className='lg:hidden bg-red-600 rounded-sm mr-6 mb-[-6px]' icon={<List onClick={toggleMenu} size={20} color='white' />} />
            {/* <Button  className='lg:hidden cursor-pointer mr-8  bg-red-600 rounded-sm p-1 hover:opacity-100 shadow-sm'>
                <List className='h-8 w-8 text-white hover:text-yellow-400 ' />
            </Button> */}
            <div className={menuOpen ? "fixed top-0 left-0 w-[25%] sm:w-[50%] inset-0 bg-black bg-opacity-40" : "hidden"} />
            <div className={menuOpen ? ' fixed top-0 right-0  w-[75%] sm:w-[50%] lg:hidden h-screen bg-white p-4 ease-in-out duration-300 z-40' : 'fixed left-[-100%] top-0 p-0 ease-in-out duration-300'}>
                {/* background */}
                {/* close button */}
                <div className="flex items-center justify-end ">
                    <IconButton className="bg-red-600" icon={<X size={15} onClick={toggleMenu} color="white" />} />
                </div>

                {/* Mobile Menu Links */}
                <div className='flex-col py-1'>
                    <MenuLinks data={data} subcategories={subcategories} toggleMenu={toggleMenu}/>
                    <ul>
                        <li onClick={() => setMenuOpen(false)} className='py-1 hover:underline hover:decoration-[#F6B519]'><Link href={'/'}>About</Link></li>
                        <li onClick={() => setMenuOpen(false)} className='py-1 hover:underline hover:decoration-[#F6B519]'><Link href={'/'}>Contact</Link></li>
                        <li className='flex items-center py-1 text-[#F6B519]'>
                            <p className='cursor-pointer px-4 py-1 rounded-full bg-[#F6B519] text-black hover:bg-black hover:text-[#F6B519]'>
                                Sign In
                            </p>
                        </li>
                    </ul>
                </div>
                {/* Social media links */}
                <div className='flex flex-row justify-around pt-10 items-center'>
                    <Link href={'/'}>
                        <Facebook size={30} className=' cursor-pointer hover:text-[#F6B519] ease-in-out duration-300' />
                    </Link>
                    <Link href={'/'}>
                        <Instagram size={30} className=' cursor-pointer hover:text-[#F6B519] ease-in-out duration-300' />
                    </Link>
                </div>
            </div>

        </>
    )
}

export default MobileMenu