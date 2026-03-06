import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShipWheelIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link } from "react-router";

import { signup } from '../lib/api';

const SignUpPage = () => {
  const [signUpData, setSignUpData] =useState({
    fullname: '',
    email: '',
    password: '',
  });
  const queryClient= useQueryClient();
  const {mutate:signupMutation,isPending,error}=useMutation(
    {
      mutationFn:signup,
      onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['authUser']});

        console.log('Signup successful',data);
        queryClient.invalidateQueries({queryKey:['authUser']});
      }
    }
  );


  const handleSignUp = (e) => {
    e.preventDefault();
    signupMutation(signUpData);
  }

  return (
    <div className='h-screen flex item-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      <div className='border border-primary/25 flex flex-row lg:flex row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        <div className='w-full lg:w-1/2 p-8'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='w-8 h-8 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamfiy</span>
          </div>
          {error && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded'>
              {error.response?.data?.message || 'An error occurred during sign up. Please try again.'}
            </div>
          )}
          <div className='w-full'>
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Create your account</h2>
                  <p className='text-sm opacity-75'>Start your journey with Streamfiy today!</p>
                </div>
                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="input input-bordered w-full"
                      value={signUpData.fullname}
                      onChange={(e) => setSignUpData({...signUpData, fullname: e.target.value})}
                    />
                  </div>
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
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
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                    />
                    <p className='text-xs mt-2 text-gray-500'>Password must be at least 8 characters long.</p>
                  </div>
                  <div className='form-control'>
                    <label className="cursor-pointer justify-start label">
                      <input type="checkbox" className="checkbox checkbox-primary mr-2" required/>
                      <span className="label-text">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                  </div>
                  


                </div>
                <button type="submit" className='btn btn-primary w-full mt-4'>
                  {isPending ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              <div>
                <p className='text-sm mt-4 text-center'>
                  Already have an account?{' '}
                  <Link to="/login" className='text-primary font-semibold hover:underline'>
                    Log In
                  </Link>
                </p>
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

export default SignUpPage
