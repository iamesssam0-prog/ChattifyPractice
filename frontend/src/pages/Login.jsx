import React, { useState } from 'react'
import { Loader2, LockIcon, MailIcon, MessageCircleIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

import loginPic from "../assets/login.png";
import { Link } from 'react-router-dom';


const Login = () => {

    const [formData, setFormData] = useState({
        email: ""
        , password: ""
    })

    const { isLogingIn, login } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-slate-900'>
            {/* الكارت الرئيسي واخد لون وسيط عشان يبرز */}
            <div className='w-full max-w-6xl bg-slate-800/50 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm'>

                <div className='w-full flex flex-col md:flex-row'>

                    {/* Left section (Data) - خلفية أفتح شوية */}
                    <div className='md:w-1/2 p-12 flex items-center justify-center bg-slate-800/40'>
                        <div className='w-full max-w-md'>
                            <div className='text-center mb-8'>
                                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <MessageCircleIcon className='w-8 h-8 text-cyan-500' />
                                </div>
                                <h2 className='text-3xl font-extrabold text-white mb-2'>Welcome Back</h2>
                                <p className='text-slate-400'>Enter your credentials to access your account</p>
                            </div>

                            <form className='space-y-5'
                                onSubmit={handleSubmit}
                            >
                                {/* Email */}
                                <div>
                                    <label className='text-slate-300 text-sm font-semibold ml-1'>Email Address</label>
                                    <div className='relative mt-2'>
                                        <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5' />
                                        <input
                                            type="email"
                                            className='w-full bg-slate-900/50 border border-slate-700 p-3 pl-10 rounded-xl focus:border-cyan-500 focus:ring-1
                                             focus:ring-cyan-500 text-slate-200 transition-all outline-none'
                                            placeholder='johndoe@gmail.com'
                                            value={formData.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className='text-slate-300 text-sm font-semibold ml-1'>Password</label>
                                    <div className='relative mt-2'>
                                        <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5' />
                                        <input
                                            type="password"
                                            className='w-full bg-slate-900/50 border border-slate-700 p-3 pl-10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 transition-all outline-none'
                                            placeholder='••••••••'
                                            value={formData.password}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <button className='w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all 
                                shadow-lg shadow-cyan-900/20 mt-6 active:scale-[0.98] cursor-pointer'>
                                    {isLogingIn ? "Logging in..." : "Sign In"}
                                    
                                </button>
                            </form>

                            <div className='text-center mt-8'>
                                <p className='text-slate-400 text-sm'>
                                    Don't have an account? <Link to="/signup" className='text-cyan-400 font-bold hover:text-cyan-300 transition-colors'>Create account</Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (Image) - خلفية أغمق بتدرج لوني */}
                    <div className='hidden md:flex md:w-1/2 p-12 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center relative'>
                        {/* لمسة فنية: شكل جمالي في الخلفية */}
                        <div className="absolute inset-0 bg-cyan-500/5 [mask-image:radial-gradient(closest-side,white,transparent)]"></div>

                        <div className="relative text-center">
                            <img src={loginPic} alt="Login Illustration" className='max-w-[80%] mx-auto drop-shadow-2xl' />
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-white">Connect with friends</h3>
                                <p className="text-slate-400 mt-2">The best place to chat and stay in touch.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
    // return (
    //     <div className='w-full flex items-center justify-center p-4 bg-slate-900 mt-30'>
    //         <div className='relative w-full max-w-6xl h-[650px] md:h-[800px] '>
    //             <div className='w-full flex flex-col md:flex-row'>




    //                 {/* Left section */}
    //                 <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r 
    //                border border-slate-600/30 rounded-lg shadow-lg
    //                 '>
    //                     <div className='w-full max-w-md'>
    //                         {/* Heading text */}
    //                         <div className='text-center mb-8'>
    //                             <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
    //                             <h2 className='text-2xl font-bold text-slate-200 mb-2'>Welcome Back</h2>
    //                             <p className='text-slate-400'>Enter your credentials to access your account
    //                             </p>
    //                         </div>

    //                         {/* FORM */}
    //                         <form className='space-y-6'>
    //                             {/* Email Input*/}
    //                             <div>
    //                                 <label className='text-slate-300 font-medium'>Email</label>
    //                                 <div className='relative  mt-2'>
    //                                     <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
    //                                     <input
    //                                         type="email"
    //                                         value={formData.email}
    //                                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //                                         className='w-full bg-slate-800 border border-slate-700 p-3 pl-10 
    //                rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500
    //                text-slate-200 placeholder:text-slate-500 transition-all'
    //                                         placeholder='johndoe@gmail.com'
    //                                     />
    //                                 </div>
    //                             </div>

    //                             {/* Password */}
    //                             <div>
    //                                 <label className='text-slate-300 font-medium'>Password</label>
    //                                 <div className='relative mt-2'>
    //                                     <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
    //                                     <input type="password"
    //                                         value={formData.password}
    //                                         onChange={(e) => setFormData({
    //                                             ...formData,
    //                                             password: e.target.value
    //                                         })}
    //                                         className='w-full bg-slate-800 border border-slate-700 p-3 pl-10 
    //                rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500
    //                text-slate-200 placeholder:text-slate-500 transition-all'
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <button
    //                                 className='w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 mt-4 cursor-pointer flex items-center justify-center gap-2'
    //                             >
    //                                 {
    //                                     isSigningIn ? (
    //                                         <>
    //                                             <Loader2 className='w-5 h-5 animate-spin' />
    //                                             Logging in...
    //                                         </>
    //                                     )
    //                                         :
    //                                         (
    //                                             "Sign In"
    //                                         )
    //                                 }
    //                             </button>
    //                         </form>
    //                         <div className='text-center mt-5'>
    //                             <span className='text-slate-400'>
    //                                 Don't have an account ? <Link
    //                                     to="/signup"
    //                                     className='text-cyan-400 
    //                                 hover:underline
    //                                 '>
    //                                     Create account
    //                                 </Link>
    //                             </span>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* Right Section */}
    //                 <div className='hidden md:w-1/2 p-8 rounded-lg shadow-lg md:block'>
    //                     <img src={loginPic} alt="" className='object-cover' />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Login
