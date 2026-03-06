import React from 'react'
import {Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import { Toaster } from 'react-hot-toast'
import {useTheme} from './store/useTheme.js'

import pageLoader from './components/pageLoader.jsx'
import Layout from './components/Layout.jsx'

import useAuthUser from './hooks/useAuthUser.js'
// import { Layout } from 'lucide-react'
const App = () => {
  const {theme} = useTheme();
  const {isLoading,authUser} = useAuthUser();
  const isAuthunticated= Boolean(authUser);
  const isOnboard=authUser?.isonborded;
  if(isLoading){
    return pageLoader();
  }
  
  return (
    <div className="h-screen" data-theme={theme}>
      
      <Routes>
        <Route path='/' element={isAuthunticated && isOnboard ? (<Layout showsidebar={true}><HomePage /></Layout>):( !isAuthunticated ?<Navigate to="/signup" /> : <Navigate to="/onboarding" /> )} />
        <Route path='/signup' element={!isAuthunticated ? <SignUpPage /> : <Navigate to="/onboarding" />} />
        <Route path='/login' element={!isAuthunticated ? <LoginPage /> : <Navigate to={isOnboard? "/" : "/onboarding"} />} />
        <Route path="/onboarding" element={isAuthunticated?  (!isOnboard? <OnboardingPage /> : <Navigate to="/" />)  : (<Navigate to="/login" />)} />
        <Route path="/chat/:id" element={
            isAuthunticated && isOnboard ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthunticated ? "/login" : "/onboarding"} />
            )
          } />
        <Route path="/call" element={isAuthunticated?  <CallPage />:<Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthunticated? <Layout showsidebar={true}><NotificationsPage /></Layout>:<Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
