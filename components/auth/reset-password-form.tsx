"use client";

import * as z from 'zod';

import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
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
import { reset } from '@/actions/reset-password';


export const ResetPasswordForm = () => {
   

    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
           
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
      
      setError(''); 
      setSuccess('');
      
      startTransition(() => {
      reset(values)
       .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
       })
      })
    }

    return (
        <CardWrapper 
          headerLabel="Reset password"
          backButtonLabel="Back to login"
          backButtonhref="/auth/login"
          headerTitle="Forgot password?"
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

export default ResetPasswordForm;