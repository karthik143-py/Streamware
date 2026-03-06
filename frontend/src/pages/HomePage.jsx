import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getRecUser, getUserfriends, outgoingFriendReqs, sendFriendReq } from '../lib/api';
import FriendCard from '../components/FriendCard';

const HomePage = () => {
  const qc=useQueryClient();
  const [out,setout]=useState(new Set());
  const [pendingUserId, setPendingUserId] = useState(null);
  const {data:friends,isLoading:loadingfrnds}=useQuery({
    queryKey:['friends'],
    queryFn:getUserfriends,
  });
  const {data:users,isLoading:loadingusers}=useQuery({
    queryKey:['users'],
    queryFn:getRecUser,
  });
  const {data:outgoingReqs,isLoading:loadingoutgoing}=useQuery({
    queryKey:['outgoingRequests'],
    queryFn:outgoingFriendReqs,
  });
  const {mutate:sendFriendReqsMutation}=useMutation({
    mutationKey:['sendFriendReq'],
    mutationFn:sendFriendReq,
    onSuccess:()=>{
      setPendingUserId(null);
      qc.invalidateQueries({queryKey:['outgoingRequests']});
    },
    onError:()=>{
      setPendingUserId(null);
    }
  });
  useEffect(()=>{
    const outs=new Set();
    if(outgoingReqs){
      outgoingReqs.forEach((req)=>{
        outs.add(req.recipient._id || req.recipient);
      });
      setout(outs);
    }
  },[outgoingReqs]);

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h1 className='text-3xl font-bold'>Your Friends</h1>


        </div>
        {
          loadingfrnds ? (
          <div className='flex justify-center px-12'>
            <div className='w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>

          </div>) : friends && friends.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              friends.map((friend)=>(
                
                 <FriendCard key={friend._id} friend={friend} />
              ))
            }
          </div>) : (
          <p>You have no friends added yet.</p>
          )
        }
        <section>
          <h2 className='text-2xl font-bold mb-4'>Discover Users</h2>
          {loadingusers ? (
            <div className='flex justify-center px-12'>
              <div className='w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>
              </div>) : 
              (
                users && users.length === 0 ? (
                  <p>No users found.</p>
                ):(
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                      users.map((user)=>{
                        const ou=out.has(user._id);
                        return(
                          <div key={user._id} className='card border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col items-start'>
                            <div className='card-body p-5'>
                              <div className='flex items-center gap-4 mb-4'>
                                <img src={user.photoUrl} alt="Profile" className='w-12 h-12 rounded-full object-cover'/>
                                <div>
                                  <h2 className='text-lg font-semibold'>{user.fullname}</h2>
                                  <p className='text-sm text-gray-500'>Native: {user.nativeLanguage}</p>
                                  <p className='text-sm text-gray-500'>Learning: {user.learningLanguage}</p>
                                </div>
                              </div>
                              <div>
                                <button disabled={ou || pendingUserId === user._id} onClick={()=>{
                                  setPendingUserId(user._id);
                                  sendFriendReqsMutation(user._id);
                                }} className={`px-4 py-2 rounded-lg text-white ${ou ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                  {ou ? 'Request Sent' : pendingUserId === user._id ? 'Sending...' : 'Add Friend'}
                                </button>
                              </div>

                            </div>
                          </div>
                        )
                      })
                    }

                  </div>
                )
              )}
            
        </section>

      </div>
      
    </div>
  )
}

export default HomePage
