'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './constants'
import { ChatCompletionRequestMessage } from 'openai'

import Heading from '@/components/Heading'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import { useProModal } from '@/hooks/use-pro-modal'
import toast from 'react-hot-toast'

const CodePage = () => {
    const router = useRouter();
    const proModal = useProModal()

    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting

    const onSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt
            }
            const newMessages = [...messages, userMessage];
            const response = await axios.post('/api/code', {
                messages: newMessages,
            });
            setMessages((current) => [...current, response.data, userMessage])
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403){
                proModal.onOpen();
            } else {
                toast.error("Something went wrong, try again!")
            }
        } finally {
            router.refresh()
        }
    }
    return (
        <div>
            <Heading 
                title='Code Generation'
                description='Generate code using descriptive text.'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitForm)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                            <FormField 
                                name="prompt" 
                                render={({field}) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent' disabled={isLoading} placeholder='Toggle button using React hooks' {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className='rounded-lg p-8 w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label='No conversation started'/>
                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message, idx) => (
                            <div key={idx} className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown 
                                    components={{
                                        pre: ({node, ...props}) => (
                                            <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'><pre {...props}/></div>
                                        ),
                                        code: ({node, ...props}) => (
                                            <code className='bg-black/10 rounded-lg p-1' {...props}/>
                                        )
                                    }} 
                                    className='text-sm overflow-hidden leading-7'
                                >
                                    {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage