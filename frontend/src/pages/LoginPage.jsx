import React from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../lib/api';
import { ShipWheelIcon } from 'lucide-react'

import { useState } from 'react'
// import { Link } from "react-router";

const LoginPage = () => {
  // const {authUser}=useAuthUser();
  const [form,setform]=useState({
    email:'',
    password:'',
  });
  const queryClient = useQueryClient();
  const {mutate:loginMutation,isPending}=useMutation(
    {
      mutationFn: loginUser,
      onSuccess: () => {
        console.log('Login successful');
        queryClient.invalidateQueries({queryKey:['authUser']});
      },
      onError: (error) => {
        console.error('Login failed:', error);
        toast.error('Login failed. Please check your credentials and try again.');
      }
    }
  )
  const handleSubmit=(e)=>{
    e.preventDefault();
    loginMutation(form);
  }
  return (
    <div className='h-screen flex item-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      <div className='border border-primary/25 flex flex-row lg:flex row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        <div className='w-full lg:w-1/2 p-8'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='w-8 h-8 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamfiy</span>
          </div>
          
          <div className='w-full'>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Login to your account</h2>
                  <p className='text-sm opacity-75'>continue your journey with Streamfiy</p>
                </div>
                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={(e) => setform({...form, email: e.target.value})}
                    />
                  </div>
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                      value={form.password}
                      onChange={(e) => setform({...form, password: e.target.value})}
                    />
                    
                  </div>
                  
                  


                </div>
                <button type="submit" className='btn btn-primary w-full mt-4'>
                  {isPending ? 'Logging In...' : 'Login'}
                </button>
              </div>
              

            </form>
          </div>

        </div>
        <div className='hidden lg:flex w-1/2 bg-primary/20 p-8'>
          <div className='h-full flex flex-col justify-center items-center text-center'>
            <img src="/Video call-bro.png" alt="Sign Up Illustration" className='mb-6 w-3/4'/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
