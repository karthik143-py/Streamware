import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { acceptFriendRequest, getNotifications } from '../lib/api';

const NotificationsPage = () => {
  const qc=useQueryClient();
  const {data:notifications,isLoading}=useQuery({
    queryKey:['notifications'],
    queryFn:getNotifications,
  });
  const {mutate:acceptFriendRequestMutation}=useMutation({
    mutationKey:['acceptFriendRequest'],
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      qc.invalidateQueries({queryKey:['notifications']});
      qc.invalidateQueries({queryKey:['friends']});
    },
  });
  const incomingRequests = notifications?.incomingReqs || [];
  const acceptedRequests = notifications?.acceptedReqs || [];

  return (
    <div>
      <div className='p-4 sm:p-6 lg:p-8'>
        <div className='container mx-auto space-y-10'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <h1 className='text-3xl font-bold'>Notifications</h1>
          </div>
          {isLoading ? (
            <div className='flex justify-center px-12'>
              <div className='w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>
            </div>
          ) : (
            <div className='space-y-8'>
              <div>
                <h2 className='text-2xl font-semibold mb-4'>Incoming Friend Requests</h2>
                {incomingRequests.length === 0 ? (
                  <p className='text-gray-600'>No incoming friend requests.</p>
                ) : (
                  <div className='space-y-4'>
                    {incomingRequests.map((req) => (
                      <div key={req._id} className='flex items-center justify-between p-4 border rounded-lg'>
                        <div className='flex items-center gap-4'>
                          <img src={req.sender.photoUrl} alt={req.sender.fullname} className='w-12 h-12 rounded-full object-cover' />
                          <div>
                            <p className='font-medium'>{req.sender.fullname}</p>
                            <p className='text-sm text-gray-500'>Wants to be your friend</p>
                          </div>
                        </div>
                        <button onClick={() => acceptFriendRequestMutation(req._id)} className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                          Accept
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h2 className='text-2xl font-semibold mb-4'>Accepted Friend Requests</h2>
                {acceptedRequests.length === 0 ? (
                  <p className='text-gray-600'>No accepted friend requests.</p>
                ) : (
                  <div className='space-y-4'>
                    {acceptedRequests.map((req) => (
                      <div key={req._id} className='flex items-center gap-4 p-4 border rounded-lg'>
                        <img src={req.recipient.photoUrl} alt={req.recipient.fullname} className='w-12 h-12 rounded-full object-cover' />
                        <div>
                          <p className='font-medium'>{req.recipient.fullname}</p>
                          <p className='text-sm text-gray-500'>accepted your friend request</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
