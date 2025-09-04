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
            console.log(login, "From login page")
      }

      return (
            <div className='w-[80%] lg:w-[60%] mx-auto h-auto px-2'>
                  <div className='w-full'>
                        <div>
                              <h1 className='text-xl'>Welcome back!</h1>
                              <p className="text-sm text-muted-foreground">Please fill up your credentials</p>
                        </div>

                        <div className='w-full mt-6'>
                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                          <Button disabled={login.isPending} type="submit" className="w-full">{login.isPending ? "Loading" : "Login"}</Button>
                                    </form>
                              </Form>
                        </div>
                        <p className="text-xs py-4">New to campus connect? <Link className="text-primary" to={"/auth/register"}>Create an account</Link></p>
                  </div>
            </div >
      )
}

export default Login

