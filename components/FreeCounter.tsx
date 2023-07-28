'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

interface freeCounter {
    apiLimitCount: number
    isPro: boolean
}

const FreeCounter = ({ apiLimitCount= 0, isPro }: freeCounter) => {

    const [mounted, setMounted] = useState(false);
    const proModal = useProModal();

    const maxFreeCounts = parseInt(process.env.NEXT_PUBLIC_MAX_FREE_COUNTS!)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null;

    if(isPro) return null;

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
                    <Button onClick={proModal.onOpen} variant="premium" className='w-full'>
                        Upgrade
                        <Zap className='h-4 w-4 ml-2 fill-white'/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter