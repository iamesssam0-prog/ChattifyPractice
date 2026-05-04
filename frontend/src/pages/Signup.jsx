// import { Loader2, LockIcon, MailIcon, MessageCircleIcon } from 'lucide-react'
// import React, { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore'

import { CircleIcon, Loader2, LockIcon, MailIcon, MessageCircle, UserIcon } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useState } from "react";
import { Link } from "react-router-dom";

import signupPic from "../assets/signup.png"



const Signup = () => {
    const { isSigningIn, signUp } = useAuthStore();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData);
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-slate-900">
            <div className="w-full max-w-6xl  bg-slate-800/50 rounded-3xl
            shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm
            ">
                <div className="w-full flex flex-col md:flex-row">
                    {/* left section */}
                    <div className="md:w-1/2 p-12 flex justify-center items-center bg-slate-800/40">
                        <div className="w-full max-w-md">
                            <div className="text-center mb-8">
                                <div className="w-18 h-18 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h2 className="text-3xl font-medium text-white">Create Account</h2>
                                <p className="mt-2 text-slate-300 text-sm">Join our community today</p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="text-slate-300 font-semibold text-sm">
                                        Full Name</label>
                                    <div className="relative mt-2">
                                        <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5' />
                                        <input
                                            type="text"
                                            className='w-full bg-slate-900/50 border border-slate-700 p-3 pl-10 rounded-xl focus:border-cyan-500 focus:ring-1
                                             focus:ring-cyan-500 text-slate-200 transition-all outline-none'
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                fullName: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-slate-300 text-sm font-semibold">
                                        Email Address</label>
                                    <div className='relative mt-2'>
                                        <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5' />
                                        <input
                                            type="email"
                                            className='w-full bg-slate-900/50 border border-slate-700 p-3 pl-10 rounded-xl focus:border-cyan-500 focus:ring-1
                                             focus:ring-cyan-500 text-slate-200 transition-all outline-none'
                                            placeholder="johndoe@gmail.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-slate-300 text-sm font-semibold">
                                        Password</label>
                                    <div className='relative mt-2'>
                                        <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5' />
                                        <input
                                            type="password"
                                            className='w-full bg-slate-900/50 border border-slate-700 p-3 pl-10 rounded-xl focus:border-cyan-500 focus:ring-1
                                             focus:ring-cyan-500 text-slate-200 transition-all outline-none'
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <button className='w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all 
                                shadow-lg shadow-cyan-900/20 mt-6 active:scale-[0.98] cursor-pointer'
                                    type="submit"
                                >
                                    {
                                        isSigningIn ?
                                            (
                                                <>
                                                    <Loader2 />
                                                    Creating Account...
                                                </>
                                            )
                                            :
                                            (
                                                "Create Account"
                                            )
                                    }
                                </button>
                            </form>
                            <div className="text-center mt-7 font-semibold text-slate-400">
                                <span>
                                    Already have an account ?
                                    <Link to="/login" className="hover:underline ml-1 
                                    text-cyan-400
                                    ">
                                        Login
                                    </Link>
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex p-12 md:w-1/2 
                    bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center relative
                    ">
                        <div className="relative text-center">
                            <img src={signupPic} alt="Login Illustration" className='max-w-[80%] mx-auto drop-shadow-2xl' />
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-white">Start Your Journey Today</h3>
                                <p className="text-slate-400 mt-2">The best place to chat and stay in touch.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup



