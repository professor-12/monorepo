"use client"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input'
import React, { useEffect } from 'react'
import { Button } from '../components/ui/button';
import { useLogin } from "../hooks/auth";
import { loginSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

const Login = () => {
      const login = useLogin()
      const navigate = useNavigate();

      const form = useForm({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                  email: "",
                  password: ""
            }
      });
      const { isSuccess } = login
      useEffect(() => {
            if (isSuccess) {
                  navigate("/home");
            }
      }, [isSuccess, navigate])


      const onSubmit = async (data) => {
            login.mutate(data)
      }

      return (
            <div className='w-[95%] sm:w-[80%] lg:w-[60%] mx-auto h-auto px-2 py-4'>
                  <div className='w-full max-w-md mx-auto'>
                        <div className='text-center mb-6'>
                              <h1 className='text-2xl font-bold'>Welcome back!</h1>
                              <p className="text-sm text-muted-foreground mt-2">Please fill up your credentials</p>
                        </div>

                        <div className='w-full mt-6'>
                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                          <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                      <FormItem >
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                  <Input placeholder="johndoe@student.oauife.edu.ng" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                  <Input type={"password"} placeholder="**********" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <Button disabled={login.isPending} type="submit" className="w-full h-12 text-base">{login.isPending ? "Loading" : "Login"}</Button>
                                    </form>
                              </Form>
                        </div>
                        <p className="text-sm py-4 text-center">New to campus connect? <Link className="text-primary font-medium" to={"/auth/register"}>Create an account</Link></p>
                  </div>
            </div >
      )
}

export default Login

