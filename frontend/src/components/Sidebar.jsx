import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { Dot, ShipWheelIcon } from 'lucide-react';

const Sidebar = () => {
    const {authUser}=useAuthUser();
    const location=useLocation();
    const pathname=location.pathname;


  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0'>
        <div className='p-5 border-b border-base-300'>
            <Link to='/' className='flex items-center gap-2.5'>
            <ShipWheelIcon className='w-8 h-8 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamfiy</span>
          
            </Link>
        </div>
        <nav className='flex-1 p-4 space-y-1'>
            <Link to='/' className={`block px-4 py-2 rounded-lg hover:bg-primary/10 ${pathname==='/' ? 'bg-primary/20 font-semibold' : ''}`}>
                Home
            </Link>
            
            
            <Link to='/notifications' className={`block px-4 py-2 rounded-lg hover:bg-primary/10 ${pathname==='/notifications' ? 'bg-primary/20 font-semibold' : ''}`}>
                Notifications
            </Link>
            <Link to='/friends' className={`block px-4 py-2 rounded-lg hover:bg-primary/10 ${pathname==='/friends' ? 'bg-primary/20 font-semibold' : ''}`}>
                Friends
            </Link>
        </nav>
        <div className='p-4 border-t border-base-300'>
            <div className='flex items-center gap-3'>
                <div >
                    <img src={authUser?.photoUrl} alt="Profile" className='w-10 h-10 rounded-full object-cover mb-2'/>
                </div>
                <div className='flex flex-col items-start justify-start'>
                <p className='font-medium'>{authUser?.fullname}</p>
                <div className='flex justify-center items-center gap-2'>
                <span className='size-2 rounded-full bg-success inline-block'></span>
                <span className='text-sm text-success'>Online</span>
                </div>
                </div>
            </div>
        </div>

    </aside>
  )
}

export default Sidebar
