'use client'

import React from 'react'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideBar from './SideBar'

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <MenuIcon />
            </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 text-white'>
            <SideBar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar