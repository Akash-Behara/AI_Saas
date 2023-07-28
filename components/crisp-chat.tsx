'use client'

import React, { useEffect } from 'react'
import {Crisp} from 'crisp-sdk-web'

export const CrispChat = () => {
    
    useEffect(() => {
        Crisp.configure("a077bd79-fb0e-49aa-bab1-3bcf789e83a8")
    }, [])

    return null
}