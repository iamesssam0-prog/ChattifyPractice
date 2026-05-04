import React, { useReducer, useRef, useState } from 'react'
import avatar from "../assets/avatar.png";
import { useAuthStore } from '../store/useAuthStore';
import { LogOutIcon, Volume2Icon } from 'lucide-react';


const ProfileHeader = () => {
    const { authUser, logout, onlineUsers,
        updateProfile } = useAuthStore();
    // const { authUser, logout, onlineUsers } = useAuthStore();

    const fileInputRef = useRef();

    // 1. تعديل الـ Change Handler عشان يرفع فوراً
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        useAuthStore.setState((state) => ({
            authUser: { ...state.authUser, profilePic: previewUrl }
        }))

        const formData = new FormData();
        formData.append('image', file);

        // ارفع الصورة علطول أول ما يختارها
        updateProfile(formData);
    };


    return (
        <div className='flex justify-between items-center  p-5 border-b border-b-slate-400'>
            <div className='flex'>
                <span
                    className={`absolute 
                        left-13
                        top-16
                        md:top-15 md:left-13 w-3.5 h-3.5 rounded-full border-2 border-[#111827] 
                        ${onlineUsers.includes(authUser._id.toString())
                            ? "bg-green-500 shadow-[0_0_8px_#22c55e]" // أخضر منور
                            : "bg-gray-500" // رمادي للأوفلاين أشيك من الأحمر الفاقع
                        }`} >
                </span>
                <img src={authUser.profilePic || avatar} alt=""
                    className='object-cover w-11 h-11 rounded-full'
                    onClick={() => fileInputRef.current.click()}
                />

                <input
                    type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className='hidden'
                />

                <div className='flex flex-col ml-2'>
                    <h2 className='font-semibold text-slate-200 text-lg'>{authUser.fullName.split(" ")[0]}</h2>
                    <p className='text-xs text-slate-400'>

                        Online</p>
                </div>
            </div>

            <div className='flex text-slate-400'>
                <button onClick={logout}>
                    <LogOutIcon className='size-5 cursor-pointer mr-4' />
                </button>

                <button>
                    <Volume2Icon className='size-5 cursor-pointer' />
                </button>
            </div>
        </div>
    )
}

export default ProfileHeader
