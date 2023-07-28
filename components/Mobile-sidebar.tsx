'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideBar from './SideBar'

interface MobileSidebarProps {
    apiLimitCount: number
    isPro: boolean
}

const MobileSidebar = ({ apiLimitCount, isPro }: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    if(isPro) return null

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 text-white'>
                <SideBar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar