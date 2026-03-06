import React from 'react'
import { Link } from 'react-router'

const FriendCard = ({ friend }) => {
  return (
    <div className='card border border-gray-300 rounded-lg p-4 shadow-sm'>
            <div >
                <img src={friend?.photoUrl} alt="Profile" className='w-10 h-10 rounded-full object-cover mb-2'/>
            </div>
            <div className='flex flex-col items-start justify-start'>
                <p className='font-medium'>{friend?.fullname}</p>

            </div>
            <div>
                <p className='text-sm text-gray-500'>Native: {friend?.nativeLanguage}</p>
                <p className='text-sm text-gray-500'>Learning: {friend?.learningLanguage}</p>
            </div>
            <Link to={`/chat/${friend._id}`} className='mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                Chat
            </Link>
    </div>
  )
}

export default FriendCard
