import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthStore } from './store/useAuthStore';
import PageLoader from './components/PageLoader';

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />;

  console.log(authUser);

  return (
    <div className='min-h-screen bg-slate-900 relative flex justify-center items-center p-4 
    overflow-hidden
    '>
      <div className='absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]' />
      <div className='absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]' />
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to="/signup" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
