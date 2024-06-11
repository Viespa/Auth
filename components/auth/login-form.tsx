"use client";

import * as z from 'zod';


import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from '@/components/ui/input';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSucces } from '@/components/form-succes';
import { login } from '@/actions/login';
import Link from 'next/link';

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === "OAuthAccountNotLinkedError" ? "Account not linked" : undefined;

    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      
      setError(''); 
      setSuccess('');
      
      startTransition(() => {
      login(values)
       .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
       })
      })
    }

    return (
        <CardWrapper 
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonhref="/auth/register"
          showSocial
          headerTitle="Login"
          >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
            >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='viespa.exe@example.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='********'
                        type='password'
                      />
                    </FormControl>
                    <Button
                      size={'sm'}
                      variant={'link'}
                      className='px-0 font-normal'
                    >
                      <Link
                        className='text-sm text-white-500 hover:underline hover:text-white-700'
                        href='/auth/forgot-password'
                        >
                        Forgot password?
                      </Link>
                    </Button>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
            <FormError  message={error || urlError } />
            <FormSucces  message={success}/>
              <Button
              disabled={isPending}
              type='submit'
              className='w-full'
              >
                Login
              </Button>
            </form>
          </Form> 
        </CardWrapper>
    )
}

export default LoginForm;