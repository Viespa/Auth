"use client";

import * as z from 'zod';

import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from 'next/navigation';
import { NewPasswordSchema } from "@/schemas";
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
import { newPassword } from '@/actions/new-password';


export const NewPasswordForm = () => {
   
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
           
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      
      setError(''); 
      setSuccess('');
      
      startTransition(() => {
        newPassword(values, token)
       .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
       })
      })
    }

    return (
        <CardWrapper 
          headerLabel="Enter new password"
          backButtonLabel="Back to login"
          backButtonhref="/auth/login"
          headerTitle="Create a new password"
          >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
            >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='********'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              
            </div>
            <FormError  message={error} />
            <FormSucces  message={success}/>
              <Button
              disabled={isPending}
              type='submit'
              className='w-full'
              >
                Reset password
              </Button>
            </form>
          </Form> 
        </CardWrapper>
    )
}

export default NewPasswordForm;