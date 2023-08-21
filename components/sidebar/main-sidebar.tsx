"use client"

import React from 'react'
import Button from '../ui/Button'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface MainSidebarProps {
    title: string
    valueKey: string
}

const MainSidebar: React.FC<MainSidebarProps> = ({
    title,
    valueKey
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const routes = [
        {
            href: "/profil/account",
            label: "Benutzerkonto-Übersicht",
            active: pathname === "/profil/account",
            id: 1
        },
        {
            href: "/profil/account/edit",
            label: "Kontoinformationen",
            active: pathname === "/profil/account/edit",
            id: 2
        },
        {
            href: "/profil/address",
            label: "Adressbuch",
            active: pathname === "/profil/address",
            id: 3
        },
        {
            href: "/profil/order",
            label: "Meine Bestellungen",
            active: pathname === "/profil/order",
            id: 4
        },
    ]

    return (
        <div className='border mb-4'>
            <h1 className=' pl-1 pr-0.5 py-1 bg-red-500 text-white font-bold text-lg capitalize'>{title}</h1>
            <div className='p-2'>
                <ul>
                    {routes.length > 0 && routes.map((route) => (
                        <li key={route.href}>
                            <Link
                                href={route.href}
                                className={cn(
                                    "flex items-center rounded-none text-base font-bold text-gray-800 p-0 bg-white hover:opacity-100 hover:underline",
                                    route.active ? "text-red-500" : "text-neutral-800"
                                )}
                            >
                                <ChevronRight size={18} />
                                {route.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MainSidebar