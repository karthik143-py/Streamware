import React from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

const Layout = ({ children, showsidebar=false } ) => {
  return (
    <div className='min-h-screen'>
        <div className='flex'>
            <div>
                {showsidebar && <Sidebar />}
            </div>
            <div className='flex-1 flex flex-col'>
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}

export default Layout
