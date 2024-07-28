"use client";

import * as z from 'zod';


import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";

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


import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSucces } from '@/components/form-succes';
import { newHome } from '@/actions/new-home';


export const HomeForm = () => {
 
    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof HomeSchema>>({
        resolver: zodResolver(HomeSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof HomeSchema>) => {
          
          setError(''); 
          setSuccess('');
          startTransition(async () => {
            newHome(values)
            .then((data) => {
              if(data?.error){
                form.reset();
                setError(data.error);
              }
              if(data?.success){
                form.reset();
                setSuccess(data.success);
              }
             })
             .catch(() => {
               setError('An error occurred');
             })
          });
    }

    return (
       
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
            >
            <div className='space-y-4'>
               
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder='Home Name'
                        type='text'
                        disabled={isPending}
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