import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input'
import React from 'react'
import { Button } from '../components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth";
import { useRegister } from "../hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { departments } from "../lib/utils";



const Signup = () => {
      const form = useForm({ defaultValues: { email: "", department: "", matricNo: "", password: "", username: "" }, resolver: zodResolver(registerSchema) });
      const { mutate: register, isPending, isSuccess } = useRegister();
      const navigate = useNavigate();

      const onSubmit = (data) => {
            register(data);
      }

      useEffect(() => {
            if (isSuccess) {
                  navigate("/home");
            }
      }, [isSuccess, navigate])

      return (
            <div className='w-[80%] lg:w-[60%] mx-auto h-auto px-2'>
                  <div className='w-full'>
                        <div>
                              <h1 className='text-xl'>Welcome on board!</h1>
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
                                          <div className="flex gap-3">
                                                <div className="flex-1">
                                                      <FormField
                                                            control={form.control}
                                                            name="username"

                                                            render={({ field }) => (
                                                                  <FormItem className="flex-1">
                                                                        <FormLabel>Username</FormLabel>
                                                                        <FormControl>
                                                                              <Input placeholder="Emmanuel@001" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                  </FormItem>
                                                            )}
                                                      />
                                                </div>
                                                <div className="flex-1">
                                                      <FormField
                                                            control={form.control}
                                                            name="matricNo"
                                                            className="flex-1"
                                                            render={({ field }) => (
                                                                  <FormItem className="flex-1">
                                                                        <FormLabel>Matric no</FormLabel>
                                                                        <FormControl>
                                                                              <Input placeholder="CSC/2022/091" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                  </FormItem>
                                                            )}
                                                      />
                                                </div>
                                          </div>
                                          <FormField
                                                control={form.control}
                                                name="department"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Faculty</FormLabel>
                                                            <FormControl>
                                                                  <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                  >
                                                                        <SelectTrigger className="w-full">
                                                                              <SelectValue placeholder="Select a Faculty" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              <SelectItem value="tech">Technology</SelectItem>
                                                                              <SelectItem value="sci">Science</SelectItem>
                                                                              <SelectItem value="eng">Engineering</SelectItem>
                                                                        </SelectContent>
                                                                  </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <FormField
                                                control={form.control}
                                                name="department"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Department</FormLabel>
                                                            <FormControl>
                                                                  <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
                                                                        <SelectTrigger className="w-full">
                                                                              <SelectValue placeholder="Select a department" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                              {departments.map(({ code, dept }) => (
                                                                                    <SelectItem value={code}>{dept}</SelectItem>
                                                                              ))
                                                                              }
                                                                        </SelectContent>
                                                                  </Select>
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
                                          <Button type="submit" className="w-full" disabled={isPending}>Create account</Button>
                                    </form>
                              </Form>
                        </div>
                        <p className="text-xs py-4">Already a member? <Link className="text-primary" to={"/auth/login"}>Sign in</Link></p>
                  </div>
            </div >
      )
}

export default Signup

