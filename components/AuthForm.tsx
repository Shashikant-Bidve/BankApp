'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


const AuthForm = ({ type } : {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authformSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ''
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

      setIsLoading(true);
      try {
        if(type === 'sign-up'){
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }

          const newUser = await signUp(userData);
          setUser(newUser);
        }

        if(type === 'sign-in'){
          const response = await signIn({
            email: data.email,
            password: data.password
          })

          if(response) router.push('/');
        }
      } catch (error) {
        console.log(error);
        
      } finally {
        setIsLoading(false);
      }
      
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1'>
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon Logo" 
              />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
    
        </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account' : type === 'sign-in' ? 'Sign-in' : 'Sign-up'}
                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    { user ? 'Link your account to get started' : 'Please enter your details'}
                </p>
            </div>

        </header>
        {
          user? ( 
            <div className='flex flex-col gap-4'>
              <PlaidLink user={user} variant="primary"></PlaidLink>
            </div>
          ):(
            <>
             <Form {...form}>
                <form onSubmit= {form.handleSubmit(onSubmit)} className="space-y-8">

                  { type === 'sign-up' && (
                    <>
                    <div className='flex gap-4'>
                    <CustomInput 
                    control={form.control} name='firstName' label='First Name' placeholder='Enter your First Name'></CustomInput>

                    <CustomInput 
                  control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last Name'></CustomInput>
                  </div>
                    <CustomInput 
                  control={form.control} name='address1' label='Address' placeholder='Enter your Address'></CustomInput>
                  <div className="flex gap-4">
                  <CustomInput 
                  control={form.control} name='city' label='City' placeholder='City'></CustomInput>
                  </div>
                  <div className="flex gap-4">
                    <CustomInput 
                  control={form.control} name='state' label='State' placeholder='Example: Maharashtra'></CustomInput>
                    
                    <CustomInput 
                  control={form.control} name='postalCode' label='Postal Code' placeholder='Example: 463001'></CustomInput>
                     </div>
                     <div className="flex gap-4">
                    <CustomInput 
                  control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='yyyy-mm-dd'></CustomInput>
                    <CustomInput 
                  control={form.control} name='ssn' label='SSN' placeholder='Enter your SSN'></CustomInput>
                    </div>
                  </>
                  )}

                  <CustomInput 
                  control={form.control} name='email' label='Email' placeholder='Enter your username'></CustomInput>

                  <CustomInput 
                  control={form.control} name='password' label='Password' placeholder='Enter your password'></CustomInput>
                  <div className='flex flex-col gap-4'>
                  <Button type="submit" className='form-btn' disabled={isLoading}>
                    {
                      isLoading ? <>
                        <Loader2 className='animate-spin' /> &nbsp;
                          Loading...
                      </> : <>
                        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                      </>
                    }
                  </Button>
                  </div>
                </form>
             </Form>

              <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                  {type === 'sign-in' ? "Don't have an account" : "Already have an account"}
                </p>
                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                {type === 'sign-in' ? 'SignUp' : 'SignIn'}
                </Link>
              </footer>
            </>
          )
        }
    </section>
  )
}

export default AuthForm