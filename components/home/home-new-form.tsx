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

export const HomeForm = () => {
    const searchParams = useSearchParams();
   

    const urlError = searchParams.get('error') === "OAuthAccountNotLinkedError" ? "Name not correct" : undefined;
    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      console.log(values);
    }

    return (
       
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
            >
            <div className='space-y-4'>
                <>
              <FormField
                control={form.control}
                name='home-name'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        
                       
                        placeholder='Home Name'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              
              </>

            </div>
            <FormError  message={error || urlError } />
            <FormSucces  message={success}/>
              <Button
              disabled={isPending}
              type='submit'
              className='w-full'
              >
                Create Home
              </Button>
            </form>
          </Form> 
        
    )
}

export default HomeForm;