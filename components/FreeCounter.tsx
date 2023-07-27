'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

interface freeCounter {
    apiLimitCount: number
}

const FreeCounter = ({ apiLimitCount= 0 }: freeCounter) => {

    const [mounted, setMounted] = useState(false);

    const maxFreeCounts = parseInt(process.env.NEXT_PUBLIC_MAX_FREE_COUNTS!)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null;


    return (
        <div className='px-3'>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-6'>
                    <div className='text-center text-sm text-white mb-4 space-y-2'>
                        <p>{apiLimitCount} / {maxFreeCounts} Free Generations</p>
                        <Progress 
                            className='h-3'
                            value={(apiLimitCount / maxFreeCounts) * 100}
                        />
                    </div>
                    <Button variant="premium" className='w-full'>
                        Upgrade
                        <Zap className='h-4 w-4 ml-2 fill-white'/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter