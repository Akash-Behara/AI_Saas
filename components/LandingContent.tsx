import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const LandingContent = () => {

    const testimonials = [
        {name: 'Antonio', avatar: "A", title: "Software Engineer", description: "This is the best application I've used!"},
        {name: 'Pratik', avatar: "P", title: "Software Engineer", description: "Amazing how easy and cool this is."},
        {name: 'Bhau', avatar: "B", title: "Software Engineer", description: "One of the best tools out there!"},
        {name: 'Nemo', avatar: "N", title: "Medical Student", description: "Great app to find information and easy to use."},
    ]

  return (
    <div className='px-20 pb-20'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>Testimonials</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {testimonials.map((item, idx) => (
                <Card key={item.description} className='bg-[#192339] border-none shadow-md hover:bg-[#1f2b46]'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-x-2 text-white w-full'>
                            <div className='w-full'>
                                <p className='text-lg flex flex-col md:flex-row items-center md:items-start md:text-start text-center w-full'>
                                    <div className='bg-[#33405f] h-11 w-11 p-4 rounded-full flex items-center justify-center'>
                                        {item.avatar}
                                    </div>
                                    <div className='ml-2'>
                                        <p className='text-md'>{item.name}</p>
                                        <p className='text-zinc-400 text-sm'>{item.title}</p>
                                    </div>
                                </p>
                            </div>
                        </CardTitle>
                        <CardContent className='pt-4 px-0 text-white'>
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default LandingContent