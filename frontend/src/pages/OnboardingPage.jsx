import React, { useState } from 'react'
// import { useNavigate } from 'react-router'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingUser } from '../lib/api';
import { ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';
import toast from 'react-hot-toast';

const OnboardingPage = () => {
  // const navigate = useNavigate();
  const {authUser}=useAuthUser();
  const queryClient= useQueryClient();
  const [form,setform]=useState({
    bio:authUser?.bio||'',
    photoUrl:authUser?.photoUrl||'',
    nativeLanguage:authUser?.nativeLanguage||'',
    learningLanguage:authUser?.learningLanguage||'',
    location:authUser?.location||'',
  });
  const {mutate:onboardingMutation,isPending} = useMutation(
    {
      mutationFn: onboardingUser,
      onSuccess: () => {
        console.log('Onboarding successful');
        queryClient.invalidateQueries({queryKey:['authUser']});
        // navigate('/');
      },
      onError: (error) => {
        console.error('Onboarding failed:', error);
        toast.error('Onboarding failed. Please try again.');
      },
    }
  );
  const handleSubmit=(e)=>{
    e.preventDefault();
    onboardingMutation(form);
  }
  const generadePhotoUrl=()=>{
    const id=Math.floor(Math.random()*100)+1;
    const photoUrl=`https://avatar.iran.liara.run/public/${id}.png`;
    setform({...form,photoUrl});
    toast.success('Generated new photo');

  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl '>
        <div className='card-body p-6 sm-p-8 flex items-center justify-start flex-col'>
          <h2 className='text-2xl font-bold mb-4'>Complete Your Onboarding</h2>
          <form onSubmit={handleSubmit} className='space-y-4 w-full'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className='size-32 rounded-full bg-base-300 '>
                {form.photoUrl ? (
                  <img src={form.photoUrl} alt='Profile' className='w-32 h-32 object-cover' />
                ) : (
                  <div className='w-32 h-32 flex items-center justify-center text-3xl text-base-content/50'>
                    no photo
                  </div>
                )}

              </div>
              <div className='flex items-center gap-2'>
                <button type='button' className='btn btn-accent' onClick={generadePhotoUrl}>
                  <ShuffleIcon className='w-5 h-5 mr-2' />
                  Generate Photo</button>

              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input type='text' className='input input-bordered w-full cursor-not-allowed' defaultValue={authUser?.fullname}/>
              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea className='textarea textarea-bordered w-full' value={form.bio} onChange={(e)=>setform({...form,bio:e.target.value})} required />
              
              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select className='select select-bordered w-full' value={form.nativeLanguage} onChange={(e)=>setform({...form,nativeLanguage:e.target.value})} required >
                  <option value=""></option>
                  {LANGUAGES.map((nlanguage) => (
                    <option key={`native-${nlanguage}`} value={nlanguage}>
                      {nlanguage}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select className='select select-bordered w-full' value={form.learningLanguage} onChange={(e)=>setform({...form,learningLanguage:e.target.value})} required >
                  <option value=""></option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Location</span>
                </label>
                <input type='text' className='input input-bordered' value={form.location} onChange={(e)=>setform({...form,location:e.target.value})} required />
              </div>
              <div className='form-control py-9 w-9/12 mt-4'>
                <button type='submit' className={`btn btn-primary ${isPending ? 'loading' : ''}`} disabled={isPending}>
                  {isPending ? 'Submitting...' : 'Submit'}
                </button>
              </div>



            </div>
          </form>
        </div>

      </div>
      
    </div>
  )
}

export default OnboardingPage
