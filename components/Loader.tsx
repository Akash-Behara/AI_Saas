import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full w-full flex flex-col gap-y-4 items-center'>
        <div className='w-10 h-10 relative animate-spin'>
            <Image src="/static/img/aiSaaslogo.png" alt="loading" fill/>
        </div>
        <p className='text-sm text-muted-foreground'>Genius is thinking...</p>
    </div>
  )
}

export default Loader