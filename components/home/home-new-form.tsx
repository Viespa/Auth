"use client";

import * as z from 'zod';


import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";

import { HomeSchema } from "@/schemas";
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
import { createHomeGroup } from '@/actions/select-home';
import Link from 'next/link';

export const HomeForm = () => {
    const searchParams = useSearchParams();
   

   
    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof HomeSchema>>({
        resolver: zodResolver(HomeSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof HomeSchema>) => {
      
      setError(''); 
      setSuccess('');
      
      startTransition(() => {
        createHomeGroup(values.name, 'clxhrvuu10000142j23hmul7d')
      });
      
      
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
                name='name'
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
            <FormError  message={error } />
            <FormSucces  message={success}/>
              <Button
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